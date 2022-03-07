import { Composer, Scenes } from "telegraf";
import { config } from "dotenv";
config();

import { context } from "../../types/types";
import { MongoClient } from "mongodb";

import greeting from "./greeting"

/**
 * Renders
 */
import renderPaymentSection from "./payment/renderPayment";
import renderConfirmSection from "./confirm/renderConfirm";
import renderDashboard from "./dashboard/renderDashboard";


/**
 * RegExp
 */
const planRegExp = new RegExp(/plan (.+)/i)

let uri = <string>process.env.DB_CONN_STRING;
const client = new MongoClient(uri);

const handler = new Composer<context>(); // 0
const payment = new Composer<context>(); // 1
const confirmation = new Composer<context>(); // 2 
const dashboard = new Composer<context>();// 3


const home = new Scenes.WizardScene(
  "home",
  handler,
  payment,
  confirmation,
  dashboard
);

handler.on("message", async (ctx) => greeting(ctx));
home.enter((ctx) => greeting(ctx))
home.hears(/\/start/, async (ctx) => {
  try {
    await client.connect()
    await client
      .db("xpremium")
      .collection("users")
      .findOne({ id: ctx.from.id })
      .then(document => {
        document ? ctx.scene.enter("admin") : greeting(ctx)
      })
  } catch (err) {
    console.log(err)
  }
})

handler.action(planRegExp, async (ctx) => renderPaymentSection(ctx))
handler.action("dashboard", async (ctx) => renderDashboard(ctx));

/**
 * Payment section
 */

const paymentRegExp = new RegExp(/payment (.+)/i)
payment.action(paymentRegExp, async (ctx) => renderConfirmSection(ctx))

payment.on("message", async (ctx) => renderPaymentSection(ctx));
payment.action("paymentConfirm", async (ctx) => renderPaymentSection(ctx));
payment.action("back", async (ctx) => greeting(ctx));

/**
 * Confirm section
 */

confirmation.on("message", async (ctx) => renderConfirmSection(ctx));
confirmation.action("confirm", async (ctx) => {
  try {
    await client.connect()
    await client
      .db("dbname")
      .collection("proposals")
      .insertOne(ctx.session.proposal)
      .then(async (data) => {
        if (data) {
          await greeting(ctx).then(() => {
            ctx.wizard.selectStep(0)
            ctx.answerCbQuery("Your proposal accepted, thanks!")
          })
        } else {
          await renderConfirmSection(ctx).then(() => {
            ctx.answerCbQuery("Try to again, please")
          })
        }
      })
  } catch (err) {
    console.log(err)
    await renderConfirmSection(ctx).then(() => {
      ctx.answerCbQuery("Try to again, please")
    })
  }
});
confirmation.action("back", async (ctx) => renderPaymentSection(ctx));

/**
 * Dashboard
 */

dashboard.action("back", async (ctx) => greeting(ctx))

export default home;
