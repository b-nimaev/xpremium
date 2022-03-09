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
let token = process.env.BOT_TOKEN

if (token === undefined) {
  throw new Error("Токен не действителен");
}
const bot = new Telegraf<MyContext>(token);
let stage = new Scenes.Stage<MyContext>([home, admin], {
  default: 'home'
})

bot.on("channel_post", async (ctx) => await newChannelPost(ctx))

bot.use(session());
bot.use(stage.middleware());


const secretPath = `/tg/${bot.secretPathComponent()}`;

if (process.env.mode === "development") {
  localtunnel({ port: 3000 }).then(result => {
    bot.telegram.setWebhook(`${result.url}${secretPath}`)
    // bot.telegram.deleteWebhook();
  })
}

const app = express();
app.get("/", (req, res) => {
  res.send("hello")
})
app.use(bot.webhookCallback(secretPath));
app.listen(3000, () => {
  console.log("Telegram bot launched");
});
