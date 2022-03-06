// Прокси
import * as express from "express";
import localtunnel = require("localtunnel");

// Телеграф
import { Telegraf, session } from "telegraf";
import Context from "./types";
import controller from "./controller";

// Переменные окружения
import * as dotenv from "dotenv";
import { getUsers, getSubscriptions } from "./services";

dotenv.config();
let token = process.env.BOT_TOKEN,
  bot_id = process.env.BOT_ID;

if (token === undefined) {
  throw new Error("Токен не действителен");
}

export const bot = new Telegraf<Context>(token);

bot.on("channel_post", async (ctx) => {
  let users = await getSubscriptions();
  users.forEach((element) => {
    ctx.copyMessage(element.id);
  });
});

bot.use(session());
bot.use(controller.middleware());

const secretPath = `/sq/${bot.secretPathComponent()}`;
localtunnel({ port: 443 }).then((result) => {
  bot.telegram.setWebhook(`${result.url}${secretPath}`);
});

const app = express();
app.use(bot.webhookCallback(secretPath));
app.listen(443, () => {
  console.log("Telegram bot launched");
});
