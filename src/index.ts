// Прокси
import * as localtunnel from "localtunnel";
import * as express from "express";

// Телеграф
import { Telegraf, session } from "telegraf";
import { context } from "./types/types";
import controller from "./controller/controller";

// Переменные окружения
import * as dotenv from "dotenv";

dotenv.config();
let token = process.env.BOT_TOKEN

if (token === undefined) {
  throw new Error("Токен не действителен");
}

const bot = new Telegraf<context>(token);

bot.start(async (ctx: context) => {
  console.log('check user');
})

bot.use(session());
bot.use(controller.middleware());

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
