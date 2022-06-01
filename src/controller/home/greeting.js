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
var extra = {
    parse_mode: 'HTML',
    reply_markup: {
        inline_keyboard: [
            [{ text: "Forex signals - 49$ per month", callback_data: "plan forex" }],
            [{ text: "Crypto signals - 49$ per month", callback_data: "plan crypto" }],
            [{ text: "Copy signals - 149$ per month", callback_data: "plan copy" }],
            [{ text: "Dashboard", callback_data: "dashboard" }]
        ]
    }
};
var __extra = {
    parse_mode: 'HTML',
    reply_markup: {
        inline_keyboard: [
            [{ text: "Forex signals - 49$ per month", callback_data: "plan forex" }],
            [{ text: "Crypto signals - 49$ per month", callback_data: "plan crypto" }],
            [{ text: "Copy signals - 149$ per month", callback_data: "plan copy" }],
            [{ text: "Dashboard", callback_data: "dashboard" }]
        ]
    }
};
var message = "In order to become a member of premium signals, you need to choose which subscription you need. Daily receipt of 5 to 10 signals!\n\n By purchasing our signals, you get access to trading strategies that are a guaranteed guarantee of your success! If our signals do not bring you profit, we will return the funds!\n\n Choose from the list below \uD83D\uDC47";
function greeting(ctx, reply) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (reply) {
                ctx.wizard.selectStep(0);
                return [2 /*return*/, ctx.reply(message, extra)];
            }
            try {
                if (ctx.message) {
                    ctx.reply(message, extra);
                    console.log('__confirm | greeting | message type update');
                }
                else {
                    ctx.editMessageText(message, __extra);
                    // ctx.answerCbQuery();
                }
            }
            catch (err) {
                console.log(err);
            }
            ctx.wizard.selectStep(0);
            return [2 /*return*/];
        });
    });
}
exports["default"] = greeting;
