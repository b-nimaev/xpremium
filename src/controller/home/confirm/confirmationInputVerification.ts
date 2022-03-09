import { Message } from "telegraf/typings/core/types/typegram";
import { MyContext } from "../../../types/index";

let extra = {
  parse_mode: 'HTML',
  reply_markup: {
    inline_keyboard: [
      [{ text: "Confirm", callback_data: "confirm" },
      { text: "« Back", callback_data: "back" }]
    ]
  }
}


export default async (ctx: MyContext) => {
  let message = ctx.update.message
  ctx.session.data = message
  ctx.telegram.copyMessage(message.from.id, message.from.id, message.message_id, extra )
} 