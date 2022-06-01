"use strict";
exports.__esModule = true;
var telegraf_1 = require("telegraf");
var keyboard = /** @class */ (function () {
    function keyboard() {
        this.greetingKeyboard = telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback("Forex signals - 49$ per month", "plan forex")],
            [telegraf_1.Markup.button.callback("Crypto signals - 49$ per month", "plan crypto")],
            [telegraf_1.Markup.button.callback("Copy signals - 149$ per month", "plan copy")],
            [telegraf_1.Markup.button.callback("Dashboard", "dashboard")],
        ]);
        this.adminGreetingKeyboard = telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback("Statistic", "stats")],
            [telegraf_1.Markup.button.callback("Subscribers", "subscribers")],
            [telegraf_1.Markup.button.callback("Inbox proposals", "inbox")]
        ]);
        this.paymentKeyboard = telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback("Crypto", "payment cryptoPay")],
            [telegraf_1.Markup.button.callback("Skrill", "payment skrill")],
            [telegraf_1.Markup.button.callback("Visa & MasterCard", "payment card")],
            [telegraf_1.Markup.button.callback("« Back", "back")],
        ]);
        this.confirmPayment = telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback("Confirm payment", "paymentConfirm")],
            [telegraf_1.Markup.button.callback("« Back", "back")],
        ]);
        this.back = telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback("« Back", "back")],
        ]);
        this.confirm = telegraf_1.Markup.inlineKeyboard([
            telegraf_1.Markup.button.callback("Confirm", "confirm"),
            telegraf_1.Markup.button.callback("« Back", "back"),
        ]);
    }
    return keyboard;
}());
exports["default"] = new keyboard();
