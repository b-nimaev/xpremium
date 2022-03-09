import { config } from "dotenv";
config();

import { MyContext } from "../../types/index"
import { MongoClient } from "mongodb"
import { title } from "./../../components/Messages";

let uri = <string>process.env.DB_CONN_STRING;
const client = new MongoClient(uri);

export default async function (ctx: MyContext) {
  let keyboard = {
    inline_keyboard: []
  }
  try {
    await client.connect()
    await client.db("xpremium").collection("proposals").find({ subscriber: false }).toArray().then(props => {
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