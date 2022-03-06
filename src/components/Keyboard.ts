import { Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/typings/core/types/typegram";

let keysOfGreetingKeyboard = {
  forexSignals: {
    text: `Forex signals - 49$ per month`,
    callback_data: "forexSignals",
  },
  cryptoSignals: {
    text: `Crypto signals - 49$ per month`,
    callback_data: "cryptoSignals",
  },
  copySignals: {
    text: `Copy signals - 149$ per month`,
    callback_data: "copySignals",
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

class keyboard {
  greetingKeyboard: Markup.Markup<InlineKeyboardMarkup>;
  paymentKeyboard: Markup.Markup<InlineKeyboardMarkup>;
  confirmPayment: Markup.Markup<InlineKeyboardMarkup>;
  back: Markup.Markup<InlineKeyboardMarkup>;
  confirm: Markup.Markup<InlineKeyboardMarkup>;
  constructor() {
    this.greetingKeyboard = Markup.inlineKeyboard([
      [
        keysOfGreetingKeyboard.forexSignals,
        keysOfGreetingKeyboard.cryptoSignals,
      ],
      [keysOfGreetingKeyboard.copySignals],
      [keysOfGreetingKeyboard.FAQ],
      [keysOfGreetingKeyboard.personalArea],
    ]);

    this.paymentKeyboard = Markup.inlineKeyboard([
      [Markup.button.callback("Crypto", "paymentCrypto")],
      [Markup.button.callback("Skrill", "paymentSkrill")],
      [Markup.button.callback("Visa & MasterCard", "paymentVisaMC")],
      [Markup.button.callback("« Назад", "back")],
    ]);

    this.confirmPayment = Markup.inlineKeyboard([
      [Markup.button.callback("Confirm payment", "paymentConfirm")],
      [Markup.button.callback("« Back", "back")],
    ]);

    this.back = Markup.inlineKeyboard([
      [Markup.button.callback("« Back", "back")],
    ]);

    this.confirm = Markup.inlineKeyboard([
      Markup.button.callback("Confirm", "confirm"),
      Markup.button.callback("« Back", "back"),
    ]);
  }
}

export default new keyboard();
