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
exports.newChannelPost = exports.recordUserProposal2 = exports.checkUserInProposals = exports.recordUserProposal = exports.setProposal = exports.getUsers = exports.checkUser = exports.getProposals = void 0;
var mongodb_1 = require("mongodb");
var dotenv_1 = require("dotenv");
var greeting_1 = require("../controller/home/greeting");
(0, dotenv_1.config)();
var dbname = process.env.DB_NAME;
var uri = process.env.DB_CONN_STRING;
var client = new mongodb_1.MongoClient(uri);
function getProposals() {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 6]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db(dbname).collection("proposals").find().toArray()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, client.close()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getProposals = getProposals;
function checkUser(id) {
    return __awaiter(this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('checking user...');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 7]);
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, client.db(dbname).collection("users").findOne({ id: id })];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, client.close()];
                case 6:
                    _a.sent();
                    console.log('closed');
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.checkUser = checkUser;
function getUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 6]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db(dbname).collection("users").find().toArray()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_3 = _a.sent();
                    console.log(err_3);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, client.close()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getUsers = getUsers;
function setProposal(proposal) {
    return __awaiter(this, void 0, void 0, function () {
        var err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 6]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db(dbname).collection("proposals").insertOne(proposal)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_4 = _a.sent();
                    console.log(err_4);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, client.close()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.setProposal = setProposal;
function recordUserProposal(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var document, err_5;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    document = {
                        id: ctx.session.data.from.id,
                        first_name: ctx.session.data.from.first_name,
                        username: ctx.session.data.from.username,
                        plan: ctx.session.plan,
                        payment: ctx.session.payment,
                        subscriber: false,
                        message: ctx.session.data
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, client
                            .db("xpremium")
                            .collection("proposals")
                            .insertOne(document)
                            .then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var chat_id, message_id;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        chat_id = ctx.update["callback_query"]["from"].id;
                                        message_id = ctx.update["callback_query"].message.message_id;
                                        console.log(message_id);
                                        if (!data) return [3 /*break*/, 2];
                                        ctx.answerCbQuery(data.insertedId.toString());
                                        return [4 /*yield*/, ctx.telegram.deleteMessage(chat_id, message_id)];
                                    case 1:
                                        _a.sent();
                                        (0, greeting_1["default"])(ctx, true);
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_5 = _a.sent();
                    console.log(err_5);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.recordUserProposal = recordUserProposal;
function checkUserInProposals(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client
                            .db("xpremium")
                            .collection("proposals")
                            .findOne({ id: ctx.from.id, plan: ctx.session.plan })];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_6 = _a.sent();
                    console.log(err_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.checkUserInProposals = checkUserInProposals;
function recordUserProposal2(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var filter, currentDate, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filter = {
                        id: +ctx.match[1],
                        plan: ctx.session.plan
                    };
                    currentDate = new Date();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, client.db("xpremium")
                            .collection('proposals')
                            .findOneAndUpdate(filter, {
                            $set: {
                                subscriber: true,
                                lastModified: currentDate.getTime()
                            }
                        }, {
                            upsert: true
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_7 = _a.sent();
                    console.log(err_7);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.recordUserProposal2 = recordUserProposal2;
function newChannelPost(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var sender, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sender = ctx.update.channel_post;
                    if (sender.chat.title == 'Forex Signals') {
                        sender.plan = 'forex';
                    }
                    else if (sender.chat.title == 'Crypto Signals') {
                        sender.plan = 'crypto';
                    }
                    console.log(sender);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, client.db("xpremium")
                            .collection("channels")
                            .insertOne(sender)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, sendMessage(ctx, sender.plan)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_8 = _a.sent();
                    console.log(err_8);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.newChannelPost = newChannelPost;
function sendMessage(ctx, plan) {
    return __awaiter(this, void 0, void 0, function () {
        var subs_1, err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.db("xpremium").collection("proposals").find({ plan: plan }).toArray()];
                case 1:
                    subs_1 = _a.sent();
                    return [4 /*yield*/, client.db("xpremium").collection("channels").findOne({ plan: plan }).then(function (document) {
                            subs_1.forEach(function (element) {
                                ctx.telegram.copyMessage(element.id, ctx.update.channel_post.sender_chat.id, ctx.update.channel_post.message_id);
                            });
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_9 = _a.sent();
                    console.log(err_9);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/*
export async function chanellPostEdited(ctx) {
  let sender = ctx.update.channel_post

  if (sender.chat.title == 'Forex Signals') {
    sender.plan = 'forex'
  } else if (sender.chat.title == 'Crypto Signals') {
    sender.plan = 'crypto'
  }

  try {
    await client.connect()
    await client.db("xpremium")
      .collection("channels")
      .findOneAndUpdate({sender})
    await sendMessage(ctx, sender.plan)
  } catch (err) {
    console.log(err)
  }
}


async function editMessage(ctx, plan) {
  try {
    let subs = await client.db("xpremium").collection("proposals").find({ plan: plan }).toArray()
    await client.db("xpremium").collection("channels").findOne({ plan: plan }).then(document => {
      subs.forEach(element => {
        ctx.telegram.copyMessage(element.id, ctx.update.channel_post.sender_chat.id, ctx.update.channel_post.message_id)
      })
    })
  } catch (err) {
    console.log(err)
  }
}
*/ 
