import { config } from "dotenv";
config();

import { MongoClient } from "mongodb"
import { MyContext } from "../../types";
import getTime from "./../../helpers/timeConverter";

let uri = <string>process.env.DB_CONN_STRING;
const client = new MongoClient(uri);

export default async function (ctx) {
  
  try {
    let text = `<b>Inbox Proposals</b>\n\n`
    console.log(ctx)
    let id: number = +ctx.match[1]
    console.log(ctx.session.plan)
    await client.connect()
    let prop = await client.db("xpremium").collection("proposals").findOne({ id: id, plan: ctx.session.plan })
    console.log(prop)
    let reply_keyboard_ = {
      inline_keyboard: [
        [
          { text: 'Confirm', callback_data: 'record ' + prop.id },
          { text: 'Decline', callback_data: 'decline ' + prop.id }
        ],
        [{ text: '« Back', callback_data: 'back' }]
      ]
    }
    if (prop.username) {
      text += `Username: @${prop.username} \n`
    }
    text += `Time: ${getTime(prop.date)} \n`
    text += `Payment system: ${prop.payment} \n\n`

    let chat_id = ctx.update["callback_query"]["from"].id
    let message_id = ctx.update["callback_query"].message.message_id
    await ctx.telegram.deleteMessage(chat_id, message_id)

    ctx.telegram.copyMessage(ctx.from.id, prop.id, prop.message.message_id, {
      reply_markup: reply_keyboard_
    })

  } catch (err) {
    console.log(err)
  }
  
  ctx.wizard.selectStep(3)
  ctx.answerCbQuery()
}