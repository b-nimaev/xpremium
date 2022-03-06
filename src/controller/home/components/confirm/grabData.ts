import context from "../../../../types";
import { sendInvoice } from "../../../../services";
import { ExtraDocument, ExtraPhoto } from "telegraf/typings/telegram-types";
import { Message } from "telegraf/typings/core/types/typegram";
import keyboard from "../keyboard";

import { Composer, Scenes } from "telegraf";
export const confirm = new Composer<context>(); // 5

confirm.on("message", async (ctx:context) => {
  console.log('this is confirm wizard step')
})

export default async function (ctx: context) {
  
  let message = ``;
  interface data {
    plan: string,
    payment: string,
    subscription: boolean,
    date: number,

    confirmation: {
      message?: Message,
      photo?: ExtraPhoto,
      document?: ExtraDocument,
    }
  }

  let data:data = {
    plan: ctx.session.single,
    payment: ctx.session.payment,
    subscription: false,
    date: ctx.message.date,
    confirmation: {
      message: ctx.message,
      photo: ctx.message["photo"],
      document: ctx.message["document"]
    }
  }

  ctx.wizard.selectStep(5)

  if (ctx.message) {
    if (data.confirmation.document) {
      ctx.replyWithDocument(data.confirmation.document["file_id"], {
        ...keyboard.confirm
      })
    }
  }

  await sendInvoice(data);
}
