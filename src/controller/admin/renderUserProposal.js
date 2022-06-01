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
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var mongodb_1 = require("mongodb");
var timeConverter_1 = require("./../../helpers/timeConverter");
var uri = process.env.DB_CONN_STRING;
var client = new mongodb_1.MongoClient(uri);
function default_1(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var text, id, prop, reply_keyboard_, chat_id, message_id, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    text = "<b>Inbox Proposals</b>\n\n";
                    console.log(ctx);
                    id = +ctx.match[1];
                    console.log(ctx.session.plan);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db("xpremium").collection("proposals").findOne({ id: id, plan: ctx.session.plan })];
                case 2:
                    prop = _a.sent();
                    console.log(prop);
                    reply_keyboard_ = {
                        inline_keyboard: [
                            [
                                { text: 'Confirm', callback_data: 'record ' + prop.id },
                                { text: 'Decline', callback_data: 'decline ' + prop.id }
                            ],
                            [{ text: '« Back', callback_data: 'back' }]
                        ]
                    };
                    if (prop.username) {
                        text += "Username: @".concat(prop.username, " \n");
                    }
                    text += "Time: ".concat((0, timeConverter_1["default"])(prop.date), " \n");
                    text += "Payment system: ".concat(prop.payment, " \n\n");
                    chat_id = ctx.update["callback_query"]["from"].id;
                    message_id = ctx.update["callback_query"].message.message_id;
                    return [4 /*yield*/, ctx.telegram.deleteMessage(chat_id, message_id)];
                case 3:
                    _a.sent();
                    ctx.telegram.copyMessage(ctx.from.id, prop.id, prop.message.message_id, {
                        reply_markup: reply_keyboard_
                    });
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 5];
                case 5:
                    ctx.wizard.selectStep(3);
                    ctx.answerCbQuery();
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = default_1;
