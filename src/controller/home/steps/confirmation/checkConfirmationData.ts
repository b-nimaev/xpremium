import { sendInvoice } from "../../../../services/services";
import context from "../../../../types/types";
import { ExtraDocument, ExtraPhoto } from "telegraf/typings/telegram-types";
import { Message } from "telegraf/typings/core/types/typegram";
import keyboard from "../../../../components/Keyboard";

export default async function checkConfirmationData(ctx: context) {
  let message = ``;
  interface data {
    plan: string;
    payment: string;
    subscription: boolean;
    date: number;

    confirmation: {
      message?: Message;
      photo?: ExtraPhoto;
      document?: ExtraDocument;
    };
  }

  let data: data = {
    plan: ctx.session.single,
    payment: ctx.session.payment,
    subscription: false,
    date: ctx.message.date,
    confirmation: {
      message: ctx.message,
      photo: ctx.message["photo"],
      document: ctx.message["document"],
    },
  };

  if (ctx.message) {
    if (data.confirmation.document) {
      ctx.replyWithDocument(data.confirmation.document["file_id"], {
        ...keyboard.confirm,
      });
    }
  }
  console.log(ctx);

  await sendInvoice(data);
}
