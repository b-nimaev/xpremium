import { Composer, Scenes } from "telegraf";
import { config } from "dotenv";

import { bot } from "../..";
import context from "../../types/types";
import { checkPropsOnExist, getUsers } from "../../services/services";

import Greeting from "./steps/greeting";
import Messages from "../../components/Messages";
import Keyboard from "../../components/Keyboard";

import renderPaymentSection from "./steps/renderPaymentSection";
import renderConfirmSection from "./steps/renderConfirmSection";

import inboxMessages from "./steps/dashboard/inboxMessages";

/**
 * Wizard steps of scene
 */

import confirm from "./steps/confirmation"

config();
const bot_id = process.env.BOT_ID
const handler = new Composer<context>(); // 0
const payment = new Composer<context>(); // 1 секция выбора платежки
const confirmationPayment = new Composer<context>(); // 2 секция платежа
import confirmationPaymentData from "./steps/confirmation" // 3 секция подтверждения платежа
const dashboard = new Composer<context>(); // 4 

const home = new Scenes.WizardScene(
  "home",
  handler,
  payment,
  confirmationPayment,
  confirmationPaymentData.step,
  dashboard
);

async function sender() {
  (await getUsers()).forEach(async (elem) => {
    bot.telegram.sendMessage(elem.id, Messages.greetingMessage, {
      parse_mode: "HTML",
      ...Keyboard.greetingKeyboard,
    })
  });
}
sender();
home.start(async (ctx) => Greeting(ctx));
home.hears("/home", async (ctx) => Greeting(ctx));
home.hears("/inbox", async (ctx) => {
  await inboxMessages(ctx);
});

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
  ctx.answerCbQuery()
});

handler.action("back", async (ctx) => Greeting(ctx));

handler.action("personalArea", async (ctx) => {
  ctx.answerCbQuery()
  ctx.editMessageText(
    "<b>Personal Area\nYour subscription: no active subscription</b>",
    {
      parse_mode: "HTML",
      ...Keyboard.back,
    }
  );
});

payment.action("paymentCrypto", async (ctx) => {
  ctx.answerCbQuery();
  ctx.session.payment = "crypto";
  ctx.editMessageText(Messages.crytoPaymentMessage, {
    parse_mode: "HTML",
    ...Keyboard.confirmPayment,
  });
  ctx.wizard.selectStep(2);
});

payment.action("paymentSkrill", async (ctx) => {
  ctx.answerCbQuery();
  ctx.session.payment = "skrill";
  ctx.editMessageText(Messages.skrillPaymentMessage, {
    parse_mode: "HTML",
    ...Keyboard.confirmPayment,
  });
  ctx.wizard.selectStep(2);
});

payment.action("paymentVisaMC", async (ctx) => {
  ctx.answerCbQuery();
  ctx.session.payment = "vmc";
  ctx.editMessageText(Messages.paymentVisaMC, {
    parse_mode: "HTML",
    ...Keyboard.confirmPayment,
  });
  ctx.wizard.selectStep(2);
});

payment.action("back", async (ctx) => {
  Greeting(ctx);
  ctx.wizard.selectStep(0);
  ctx.answerCbQuery();
});

async function confirmationMessageSection(ctx) {
  ctx.answerCbQuery();
  ctx.editMessageText(Messages.confirmationMessage, {
    parse_mode: "HTML",
    ...Keyboard.back,
  });
  ctx.wizard.selectStep(3);
}

payment.on("message", async (ctx) => renderPaymentSection(ctx));
confirmationPayment.on("message", async (ctx) => renderConfirmSection(ctx));
confirmationPayment.action("paymentConfirm", async (ctx) => confirmationMessageSection(ctx));
confirmationPayment.action("back", async (ctx) => renderPaymentSection(ctx));

handler.on("message", async (ctx) => Greeting(ctx));

// dashboard.hears(/\/select (\w+)/, async (ctx) => {
  // console.log(ctx.match)
// });

dashboard.hears(/\/select (\w+)/, async (ctx) => {
  console.log(ctx.match);
});
dashboard.hears(/\/help/, async (ctx) => {
  let message = ``
  message += `/approve <ID or username> — <i>For approve proposal</i>\n`;
  message += `/decline <ID or username> — <i>For decline proposal</i>\n`;
  // message += `<strike>/multiApprove [<String of IDs || usernames>, <all>] — <i>For approve proposals</i></strike>\n`;
  ctx.reply(message, { parse_mode: 'HTML' })
  // await inboxMessages(ctx)
});

export default home;
