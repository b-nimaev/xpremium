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
// import { getTime } from "helpers/timeConverter"
// import { title } from "components/Messages";
var timeConverter_1 = require("./../../helpers/timeConverter");
var Messages_1 = require("./../../components/Messages");
var uri = process.env.DB_CONN_STRING;
var client = new mongodb_1.MongoClient(uri);
function renderSelectedPlan(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var plan, text, keyboard, proposals, index, prop;
        return __generator(this, function (_a) {
            ctx.wizard.selectStep(2);
            ctx.answerCbQuery();
            console.log('renderselectedplan');
            if (typeof (ctx.match[1]) !== "undefined") {
                ctx.session.plan = ctx.match[1];
                plan = ctx.session.plan;
            }
            else {
                plan = ctx.session.plan;
            }
            console.log(plan);
            text = "<b>Inbox Proposals \u2014 ".concat(Messages_1.title[plan], "</b>\n");
            keyboard = {
                inline_keyboard: []
            };
            proposals = [];
            ctx.session.proposals.forEach(function (element) {
                if (element.plan == plan) {
                    proposals.push(element);
                }
            });
            text += "<b>Finded elements: ".concat(proposals.length, "</b>\n\n");
            for (index = 0; index < proposals.length; index++) {
                prop = proposals[index];
                text += "<i>".concat(index, ". ").concat(prop.payment, " </i>");
                if (prop.username) {
                    text += "<i>@".concat(prop.username, "</i> ");
                }
                else {
                    text += "<i>".concat(prop.id, "</i> ");
                }
                text += "<i>".concat((0, timeConverter_1["default"])(prop.date), "</i>\n");
                keyboard.inline_keyboard.push([{
                        text: index, callback_data: "prop " + proposals[index].id
                    }]);
            }
            keyboard.inline_keyboard.push([
                { text: "« Back", callback_data: "back" }
            ]);
            ctx.editMessageText(text, {
                parse_mode: 'HTML',
                reply_markup: keyboard
            });
            return [2 /*return*/];
        });
    });
}
exports["default"] = renderSelectedPlan;
