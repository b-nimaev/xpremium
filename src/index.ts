// Прокси
import * as localtunnel from "localtunnel";
import * as express from "express";

// Телеграф

import { Telegraf, session, Scenes } from "telegraf";
import { MyContext } from "./types";

// Handler factories
const { enter, leave } = Scenes.Stage
// Переменные окружения
import * as dotenv from "dotenv";

import home from "./controller/home/home";
import admin from "./controller/admin";
import { newChannelPost } from "./services/services";

dotenv.config();
let token = "5319118085:AAGFG3SYe4WPnzE_m5PiZwltEMP5r7TlTE8"

if (token === undefined) {
  throw new Error("Токен не действителен");
}
const bot = new Telegraf<MyContext>(token);
let stage = new Scenes.Stage<MyContext>([home, admin], {
  default: 'home'
})
bot.hears("/start", async (ctx) => console.log("hi"))
bot.on("channel_post", async (ctx) => await newChannelPost(ctx))

bot.use(session());
bot.use(stage.middleware());


const secretPath = `/tg/${bot.secretPathComponent()}`;

if (process.env.mode === "development") {
  localtunnel({ port: 3000 }).then(result => {
    bot.telegram.setWebhook(`${result.url}${secretPath}`)
    // bot.telegram.deleteWebhook();
  })
} else {
  bot.telegram.setWebhook(`${process.env.ip}/${secretPath}`)
}

const app = express();
app.get("/", (req, res) => {
  res.send("hello")
})
app.use(bot.webhookCallback(secretPath));
app.listen(3000, () => {
  console.log("Telegram bot launched");
});
