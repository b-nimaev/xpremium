import { config } from "dotenv";
config();

import { MyContext } from "../../types/index";
import { MongoClient } from "mongodb";
// import { getTime } from "helpers/timeConverter"
// import { title } from "components/Messages";
import getTime from "./../../helpers/timeConverter";
import { title } from "./../../components/Messages";

let uri = <string>process.env.DB_CONN_STRING;
const client = new MongoClient(uri);

export default async function renderSelectedPlan(ctx) {
  ctx.wizard.selectStep(2)
  ctx.answerCbQuery()
  console.log('renderselectedplan')
  let plan

  if (typeof (ctx.match[1]) !== "undefined") {
    ctx.session.plan = ctx.match[1]
    plan = ctx.session.plan
  } else {
    plan = ctx.session.plan
  }
  console.log(plan)

  let text = `<b>Inbox Proposals — ${title[plan]}</b>\n`
  let keyboard = {
    inline_keyboard: []
  }
  let proposals = []
  ctx.session.proposals.forEach((element) => {
    if (element.plan == plan) {
      proposals.push(element)
    }
  })
  text += `<b>Finded elements: ${proposals.length}</b>\n\n`
  for (let index = 0; index < proposals.length; index++) {
    let prop = proposals[index]
    text += `<i>${index}. ${prop.payment} </i>`
    if (prop.username) {
      text += `<i>@${prop.username}</i> `
    } else {
      text += `<i>${prop.id}</i> `
    }
    text += `<i>${getTime(prop.date)}</i>\n`
    keyboard.inline_keyboard.push([{
      text: index, callback_data: "prop " + proposals[index].id
    }])
  }

  keyboard.inline_keyboard.push([
    { text: "« Back", callback_data: "back" }
  ])

  ctx.editMessageText(text, {
    parse_mode: 'HTML',
    reply_markup: keyboard
  })
}