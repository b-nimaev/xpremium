import { Composer, Markup, Scenes } from "telegraf";
import { config } from "dotenv";
config();

import { context } from "../../types/types";
import Messages, { title } from "../../components/Messages";
import Keyboard from "../../components/Keyboard";
import getTime from "../../includes/timeConverter";
import { MongoClient } from "mongodb";

let uri = <string>process.env.DB_CONN_STRING;
const client = new MongoClient(uri);

const handler = new Composer<context>(); // 0
const inbox = new Composer<context>(); // 1
const proposals = new Composer<context>(); // 2
const user = new Composer<context>(); // 2
const admin = new Scenes.WizardScene(
  "admin",
  handler, // 0
  inbox, // 1
  proposals, // 2
  user
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
inbox.action(planRegExp, ctx => renderSelectedPlan(ctx))

const getProposalRegExp = new RegExp(/prop (.+)/i)
proposals.action(getProposalRegExp, ctx => renderUserProposal(ctx))
proposals.action("back", ctx => renderInbox(ctx))

user.action("record", async (ctx) => {
  // confirm prop
  ctx.answerCbQuery()
})
user.action("decline", async (ctx) => {
  // decline prop
  ctx.answerCbQuery()
})
user.action("back", async (ctx) => renderSelectedPlan(ctx))

async function renderUserProposal(ctx) {
  let text = `<b>Inbox Proposals</b>\n\n`
  let id: number = +ctx.match[1]
  try {
    await client.connect()
    let prop = await client.db("xpremium").collection("proposals").findOne({ id: id })
    if (prop.username) {
      text += `Username: @${prop.username} \n`
    }
    text += `Time: ${getTime(prop.date)} \n`
    text += `Payment system: ${prop.payment} \n\n`
    if (prop.confirmation.message.text) {
      ctx.editMessageText(prop.confirmation.message.text, Markup.inlineKeyboard([
        [
          Markup.button.callback('Confirm', 'record'),
          Markup.button.callback('Decline', 'decline')
        ],
        [
          Markup.button.callback('« Back', 'back')
        ]
      ]))
    }
  } catch (err) {
    console.log(err)
  }

  // console.log(`First name: ${prop.name}`)
  ctx.wizard.selectStep(3)
  ctx.answerCbQuery()
}

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

async function renderSelectedPlan(ctx) {
  ctx.wizard.selectStep(2)
  ctx.answerCbQuery()
  if (ctx.match[1]) {
    ctx.session.plan = ctx.match[1]
  }
  let plan = ctx.session.plan
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

async function renderInbox(ctx) {
  let keyboard = {
    inline_keyboard: []
  }
  console.log('render')
  try {
    await client.connect()
    await client.db("xpremium").collection("proposals").find().toArray().then(props => {
        ctx.session.proposals = props
        let list = []
        // Перебираем массив заявок
        props.forEach((element, indexOfElement) => {
          list.push(element.plan)
        });

        let newList = Array.from(new Set(list))

        for (let index = 0; index < newList.length; index++) {
          let plan = newList[index]
          let key = [{ text: title[plan], callback_data: "plan " + plan }]
          keyboard.inline_keyboard.push(key)
        }
        keyboard.inline_keyboard.push([{ text: "« Back", callback_data: "back" }])

        ctx.wizard.selectStep(1)
        ctx.editMessageText("<b>Inbox Proposals</b>\n\n", {
          parse_mode: 'HTML',
          reply_markup: keyboard
        })
      }).catch((data) => {
        console.log(data)
      })
  } catch (err) {
    console.log(err)
  } finally {
    // ctx.answerCbQuery()
    await client.close()
  }
}

export default admin