"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var title = {
    forex: 'Forex signals - 49$ per month',
    crypto: 'Crypto signals - 49$ per month',
    copy: 'Copy signals - 149$ per month'
};
var messages = {
    forex: "\n    <b>".concat(title.forex, "</b>\n    \nQuality and proven forex/gold/indices signals. The percentage of successful trades is about 90%, the monthly pips plan is 3000. Intraday and scalping deals\n    \nSelect a payment method \uD83D\uDC47\n    "),
    crypto: "\n    <b>".concat(title.crypto, "</b>\n    \nQuality and proven crypto signals. Intraday signals, with levarage. Futures + spot deals. Access to futures trading signals like Binance, okex, bybit, huobi.\n    "),
    copy: "\n    <b>".concat(title.copy, "</b>\n    \nCopy forex signals on your forex account. Any brokers. Minimum deposit - 2000$. No split or profit share. Copying with stop loss and take profit. With all sell and buy limits.\n    ")
};
var extra = {
    parse_mode: 'HTML',
    reply_markup: {
        inline_keyboard: [
            [{ text: "Crypto", callback_data: "payment cryptoPay" }],
            [{ text: "Skrill", callback_data: "payment skrill" }],
            [{ text: "Visa & MasterCard", callback_data: "payment card" }],
            [{ text: "« Back", callback_data: "back" }]
        ]
    }
};
function default_1(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var plan;
        return __generator(this, function (_a) {
            ctx.wizard.selectStep(1);
            if (ctx.message) {
                ctx.reply(messages[ctx.session.plan], extra);
            }
            else {
                plan = ctx.match[1];
                if (typeof (plan) == "string") {
                    ctx.session.plan = ctx.match[1];
                }
                ctx.editMessageText(messages[ctx.session.plan], extra);
                ctx.answerCbQuery();
            }
            return [2 /*return*/];
        });
    });
}
exports["default"] = default_1;
