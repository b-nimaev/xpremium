import { proposal } from "../../../types/types";

let keyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "confirm", callback_data: "confirm" }],
      [{ text: "« back", callback_data: "back" }]
    ]
  }
}

export default async function checkConfirmationData(ctx) {
  let message = ``;
  let data: proposal = {
    id: ctx.from.id,
    username: ctx.from.username,
    plan: ctx.session.plan,
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
      keyboard,
    });
  }

  if (data.confirmation.photo) {
    ctx.replyWithPhoto(ctx.message["photo"][0].file_id, {
      caption: ctx.message["caption"],
      keyboard,
    });
  }

  if (data.confirmation.message["text"]) {
    ctx.reply(ctx.message["text"], { keyboard });
  }
}
