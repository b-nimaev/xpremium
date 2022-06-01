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
var telegraf_1 = require("telegraf");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var mongodb_1 = require("mongodb");
var greeting_1 = require("./greeting");
/**
 * Renders
 */
var renderPaymentSystemVariables_1 = require("./payment/renderPaymentSystemVariables");
var renderSelectedPaymmentDescription_1 = require("./payment/renderSelectedPaymmentDescription");
var renderConfirmationSection_1 = require("./confirm/renderConfirmationSection");
var renderDashboard_1 = require("./dashboard/renderDashboard");
var confirmationInputVerification_1 = require("./confirm/confirmationInputVerification");
var Messages_1 = require("../../components/Messages");
var services_1 = require("./../../services/services");
/**
 * RegExp
 */
var planRegExp = new RegExp(/plan (.+)/i);
var uri = process.env.DB_CONN_STRING;
var client = new mongodb_1.MongoClient(uri);
var handler = new telegraf_1.Composer(); // 0
var payment = new telegraf_1.Composer(); // 1
var confirmation = new telegraf_1.Composer(); // 2 
var confirm = new telegraf_1.Composer(); // 3
var dashboard = new telegraf_1.Composer(); // 4
var home = new telegraf_1.Scenes.WizardScene("home", handler, payment, confirmation, confirm, dashboard);
handler.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, (0, greeting_1["default"])(ctx)];
}); }); });
home.enter(function (ctx) { return (0, greeting_1["default"])(ctx); });
home.hears(/\/start/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, client.connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, client
                        .db("xpremium")
                        .collection("users")
                        .findOne({ id: ctx.from.id })
                        .then(function (document) {
                        document ? ctx.scene.enter("admin") : (0, greeting_1["default"])(ctx);
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
handler.action(planRegExp, function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, (0, renderPaymentSystemVariables_1["default"])(ctx)];
}); }); });
handler.action("dashboard", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, (0, renderDashboard_1["default"])(ctx)];
}); }); });
/**
 * Payment section
 */
var paymentRegExp = new RegExp(/payment (.+)/i);
payment.action(paymentRegExp, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 6]);
                return [4 /*yield*/, client.connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, client.db("xpremium").collection("proposals").findOne({ id: ctx.from.id, plan: ctx.session.plan })];
            case 2:
                result = _a.sent();
                if (result) {
                    return [2 /*return*/, ctx.answerCbQuery("Your proposal for this ".concat(Messages_1.title[ctx.session.plan], " exist!"))];
                }
                return [3 /*break*/, 6];
            case 3:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, client.close()];
            case 5:
                _a.sent();
                return [7 /*endfinally*/];
            case 6:
                (0, renderSelectedPaymmentDescription_1["default"])(ctx);
                return [2 /*return*/];
        }
    });
}); });
payment.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, (0, renderPaymentSystemVariables_1["default"])(ctx)];
}); }); });
payment.action("paymentConfirm", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, (0, renderPaymentSystemVariables_1["default"])(ctx)];
}); }); });
payment.action("back", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, (0, greeting_1["default"])(ctx)];
}); }); });
/**
 * Confirm section
 */
confirmation.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, (0, renderSelectedPaymmentDescription_1["default"])(ctx)];
}); }); });
confirmation.action("confirm", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, (0, renderConfirmationSection_1["default"])(ctx)];
}); }); });
confirmation.action("back", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, (0, renderPaymentSystemVariables_1["default"])(ctx)];
}); }); });
// confirm.action("__confirm", async (ctx) => recordConfirmation(ctx))
confirm.action("back", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, (0, renderSelectedPaymmentDescription_1["default"])(ctx)];
}); }); });
confirm.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, (0, confirmationInputVerification_1["default"])(ctx)];
}); }); });
confirm.action("confirm", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, (0, services_1.recordUserProposal)(ctx)];
}); }); });
/**
 * Dashboard
 */
dashboard.action("back", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, (0, greeting_1["default"])(ctx)];
}); }); });
dashboard.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, (0, renderDashboard_1["default"])(ctx)];
}); }); });
exports["default"] = home;
