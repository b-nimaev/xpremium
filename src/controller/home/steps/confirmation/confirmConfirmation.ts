import { context, proposal } from "../../../../types/types";
import keyboard from "../../../../components/Keyboard";

export default async function checkConfirmationData(ctx: context) {
  let message = ``;
  let data: proposal = {
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
  ctx.session.proposal = data

  if (data.confirmation.document) {
    ctx.replyWithDocument(data.confirmation.document["file_id"], {
      caption: ctx.message["caption"],
      ...keyboard.confirm,
    });
  }

  if (data.confirmation.photo) {
    console.log(ctx.message);
    ctx.replyWithPhoto(ctx.message["photo"][0].file_id, {
      caption: ctx.message["caption"],
      ...keyboard.confirm,
    });
  }

  if (data.confirmation.message["text"]) {
    ctx.reply(ctx.message["text"], { ...keyboard.confirm });
  }
}
