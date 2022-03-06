import { Markup } from "telegraf";

let keysOfGreetingKeyboard = {
  forexSignals: {
    text: `Forex signals - 49$ per month`,
    callback_data: "forexSignals",
  },
  cryptoSignals: {
    text: `Crypto signals - 49$ per month`,
    callback_data: "cryptoSignals",
  },
  FAQ: {
    text: "FAQ",
    callback_data: "faq",
  },
  personalArea: {
    text: "👤 Personal Area",
    callback_data: "personalArea",
  },
  back: {
    text: "« Back",
    callback_data: "back",
  },
};

export default new (class keyboard {
  greetingKeyboard = Markup.inlineKeyboard([
    [keysOfGreetingKeyboard.forexSignals, keysOfGreetingKeyboard.cryptoSignals],
    [keysOfGreetingKeyboard.FAQ],
    [keysOfGreetingKeyboard.personalArea],
  ]);

  paymentKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback("Crypto", "paymentCrypto")],
    [Markup.button.callback("Skrill", "paymentSkrill")],
    [Markup.button.callback("Visa & MasterCard", "paymentVisaMC")],
    [Markup.button.callback("« Назад", "back")],
  ]);

  confirmPayment = Markup.inlineKeyboard([
    [Markup.button.callback("Confirm payment", "paymentConfirm")],
    [Markup.button.callback("« Back", "back")],
  ]);

  back = Markup.inlineKeyboard([[Markup.button.callback("« Back", "back")]]);

  confirm = Markup.inlineKeyboard([
    Markup.button.callback("Confirm", "confirm"),
    Markup.button.callback("« Back", "back"),
  ]);
})();
