import { Composer, Scenes } from "telegraf";
import { config } from "dotenv";
config();

import { MyContext } from "../../types";
import { MongoClient } from "mongodb";

import greeting from "./greeting"

/**
 * Renders
 */
import renderPaymentSystemVariables from "./payment/renderPaymentSystemVariables";
import renderSelectedPaymentDescription from "./payment/renderSelectedPaymmentDescription";
import confirmationInputVerificationSection from "./confirm/renderConfirmationSection";
import renderDashboard from "./dashboard/renderDashboard";

import confirmationInputVerification from "./confirm/confirmationInputVerification";
import { title } from "../../components/Messages";
import { recordUserProposal } from "./../../services/services";


/**
 * RegExp
 */
const planRegExp = new RegExp(/plan (.+)/i)

let uri = <string>process.env.DB_CONN_STRING;
const client = new MongoClient(uri);

const handler = new Composer<MyContext>(); // 0
const payment = new Composer<MyContext>(); // 1
const confirmation = new Composer<MyContext>(); // 2 
const confirm = new Composer<MyContext>(); // 3
const dashboard = new Composer<MyContext>();// 4


const home = new Scenes.WizardScene(
  "home",
  handler,
  payment,
  confirmation,
  confirm,
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

handler.action(planRegExp, async (ctx) => renderPaymentSystemVariables(ctx))
handler.action("dashboard", async (ctx) => renderDashboard(ctx));

/**
 * Payment section
 */

const paymentRegExp = new RegExp(/payment (.+)/i)
payment.action(paymentRegExp, async (ctx) => {

  try {
    await client.connect()
    let result = await client.db("xpremium").collection("proposals").findOne({ id: ctx.from.id, plan: ctx.session.plan })
    if (result) {
      return ctx.answerCbQuery(`Your proposal for this ${title[ctx.session.plan]} exist!`)
    }
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }

  renderSelectedPaymentDescription(ctx)
})

payment.on("message", async (ctx) => renderPaymentSystemVariables(ctx));
payment.action("paymentConfirm", async (ctx) => renderPaymentSystemVariables(ctx));
payment.action("back", async (ctx) => greeting(ctx));

/**
 * Confirm section
 */

confirmation.on("message", async (ctx) => renderSelectedPaymentDescription(ctx));
confirmation.action("confirm", async (ctx) => confirmationInputVerificationSection(ctx));
confirmation.action("back", async (ctx) => renderPaymentSystemVariables(ctx));

// confirm.action("__confirm", async (ctx) => recordConfirmation(ctx))
confirm.action("back", async (ctx) => renderSelectedPaymentDescription(ctx))
confirm.on("message", async (ctx) => confirmationInputVerification(ctx))
confirm.action("confirm", async (ctx: MyContext) => recordUserProposal(ctx))

/**
 * Dashboard
 */

dashboard.action("back", async (ctx) => greeting(ctx))
dashboard.on("message", async (ctx) => renderDashboard(ctx))

export default home;
