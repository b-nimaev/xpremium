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
  console.log(ctx.wizard);
})

bot.use(session());
bot.use(controller.middleware());

const secretPath = `/secret-path/tg/${bot.secretPathComponent()}`;

if (process.env.mode === "development") {
  localtunnel({ port: 443 }).then(result => {
    bot.telegram.setWebhook(`${result.url}${secretPath}`)
    // bot.telegram.deleteWebhook();
  })
} else {
  bot.telegram.setWebhook(`//tgstat.say-an.ru${secretPath}`)
}

const app = express();
app.use(bot.webhookCallback(secretPath));
app.listen(443, () => {
  console.log("Telegram bot launched");
});
