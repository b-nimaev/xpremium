import { Composer, Scenes } from "telegraf";
import { config } from "dotenv";
config();

import { context } from "../../types/types";
import { checkPropsOnExist } from "../../services/services";

// import greeting from "./greeting";
import Messages from "../../components/Messages";
import Keyboard from "../../components/Keyboard";

const bot_id = process.env.BOT_ID;

import PaymentComposer from "./steps/payment"; // 1 выбор платежки
import confirmationPaymentData from "./steps/confirmation/confirmation"; // 3 секция подтверждения платежа

const handler = new Composer<context>(); // 0
const home = new Scenes.WizardScene(
  "home",
  handler, // 0
  PaymentComposer, //1
  confirmationPaymentData
);

export function greeting(ctx) {
    if (ctx.message) {
      console.log("message");
      ctx.reply(Messages.greetingMessage, {
        parse_mode: "HTML",
        ...Keyboard.greetingKeyboard,
      });
    } else {
      ctx.editMessageText(Messages.greetingMessage, {
        parse_mode: "HTML",
        ...Keyboard.greetingKeyboard,
      });
      ctx.answerCbQuery();
      ctx.wizard.selectStep(0);
    }
}

handler.on("message", async (ctx) => greeting(ctx));

/*
async function sender() {
  (await getUsers()).forEach(async (elem) => {
    bot.telegram.sendMessage(elem.id, Messages.greetingMessage, {
      parse_mode: "HTML",
      ...Keyboard.greetingKeyboard,
    });
  });
}
sender();
*/
home.enter((ctx) => greeting(ctx))
handler.action("forexSignals", async (ctx) => {
  ctx.session.single = "forex";
  if (await checkPropsOnExist(ctx)) {
    ctx.answerCbQuery("Заявка на рассмотрении");
  } else {
    await checkPropsOnExist(ctx);
    ctx.answerCbQuery();
    ctx.editMessageText(Messages.forexSignalsMessage, {
      parse_mode: "HTML",
      ...Keyboard.paymentKeyboard,
    });
    ctx.wizard.selectStep(1);
  }
});

handler.action("cryptoSignals", async (ctx) => {
  ctx.session.single = "crypto";
  if (await checkPropsOnExist(ctx)) {
    ctx.answerCbQuery("Заявка на рассмотрении!");
  } else {
    ctx.answerCbQuery();
    ctx.editMessageText(Messages.cryptoSignalsMessage, {
      parse_mode: "HTML",
      ...Keyboard.paymentKeyboard,
    });
    ctx.wizard.selectStep(1);
  }
});

handler.action("faq", async (ctx) => {
  ctx.editMessageText(Messages.FAQMessage, {
    parse_mode: "HTML",
    ...Keyboard.back,
  });
  ctx.answerCbQuery();
});

handler.action("back", async (ctx) => greeting(ctx));

handler.action("personalArea", async (ctx) => {
  ctx.answerCbQuery();
  ctx.editMessageText(
    "<b>Personal Area\nYour subscription: no active subscription</b>",
    {
      parse_mode: "HTML",
      ...Keyboard.back,
    }
  );
});

export default home;
