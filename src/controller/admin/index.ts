import { Composer, Scenes } from "telegraf";
import { config } from "dotenv";
config();

import { MyContext } from "../../types/index";

// import { Messages } from "components/Messages";
import { MongoClient } from "mongodb";

/**
 * Renders
 */

import renderUserProposal from "./renderUserProposal";
import renderSelectedPlan from "./renderInboxSelectedPlan";
import renderInbox from "./renderInbox";
import { recordUserProposal, recordUserProposal2 } from "./../../services/services";
import { Messages } from "./../../components/Messages";
import Keyboard from "./../../components/Keyboard";

let uri = <string>process.env.DB_CONN_STRING;
const client = new MongoClient(uri);

const handler = new Composer<MyContext>(); // 0
const inbox = new Composer<MyContext>(); // 1
const proposals = new Composer<MyContext>(); // 2
const user = new Composer<MyContext>(); // 3
const admin = new Scenes.WizardScene(
  "admin",
  handler, // 0
  inbox, // 1
  proposals, // 2
  user, // 3
);

admin.enter((ctx) => greeting(ctx))
admin.action("inbox", async (ctx) => renderInbox(ctx))

inbox.action("back", ctx => {
  greeting(ctx)
  ctx.wizard.selectStep(0)
  ctx.answerCbQuery()
})

handler.action("stats", async (ctx) => {
  ctx.answerCbQuery()
})
handler.action("subscribers", async (ctx) => {
  ctx.answerCbQuery()
})

const planRegExp = new RegExp(/plan (.+)/i)
const recordRegExp = new RegExp(/record (.+)/i)

inbox.action(planRegExp, ctx => renderSelectedPlan(ctx))

const getProposalRegExp = new RegExp(/prop (.+)/i)
proposals.action(getProposalRegExp, ctx => renderUserProposal(ctx))
proposals.action("back", ctx => renderInbox(ctx))

user.action(recordRegExp, async (ctx) => {
  await recordUserProposal2(ctx)
  ctx.answerCbQuery("Ready")
  greeting(ctx)
})
user.action("decline", async (ctx) => {
  // decline prop
  ctx.answerCbQuery()
})
user.action("back", async (ctx) => renderSelectedPlan(ctx))

export function greeting(ctx) {
  if (ctx.message) {
    console.log("message");
    ctx.reply(Messages.adminGreetingMessage, {
      parse_mode: "HTML",
      ...Keyboard.adminGreetingKeyboard,
    });
  } else {
    ctx.editMessageText(Messages.adminGreetingMessage, {
      parse_mode: "HTML",
      ...Keyboard.adminGreetingKeyboard,
    });
    ctx.answerCbQuery();
    ctx.wizard.selectStep(0);
  }
}

export default admin