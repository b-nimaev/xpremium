import { Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/typings/core/types/typegram";
class keyboard {
  greetingKeyboard: Markup.Markup<InlineKeyboardMarkup>;
  adminGreetingKeyboard: Markup.Markup<InlineKeyboardMarkup>;
  paymentKeyboard: Markup.Markup<InlineKeyboardMarkup>;
  confirmPayment: Markup.Markup<InlineKeyboardMarkup>;
  back: Markup.Markup<InlineKeyboardMarkup>;
  confirm: Markup.Markup<InlineKeyboardMarkup>;
  constructor() {
    this.greetingKeyboard = Markup.inlineKeyboard([
      [Markup.button.callback("Forex signals - 49$ per month", "plan forex")],
      [Markup.button.callback("Crypto signals - 49$ per month", "plan crypto")],
      [Markup.button.callback("Copy signals - 149$ per month", "plan copy")],
      [Markup.button.callback("Dashboard", "dashboard")],
    ]);

    this.adminGreetingKeyboard = Markup.inlineKeyboard([
      [Markup.button.callback("Statistic", "stats")],
      [Markup.button.callback("Subscribers", "subscribers")],
      [Markup.button.callback("Inbox proposals", "inbox")]
    ]);

    this.paymentKeyboard = Markup.inlineKeyboard([
      [Markup.button.callback("Crypto", "payment cryptoPay")],
      [Markup.button.callback("Skrill", "payment skrill")],
      [Markup.button.callback("Visa & MasterCard", "payment card")],
      [Markup.button.callback("« Back", "back")],
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
