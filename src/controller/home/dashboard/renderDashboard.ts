let extra =  {
  parse_mode: 'HTML',
  reply_markup: {
    inline_keyboard: [
      [{ text: "« Back", callback_data: "back" }]
    ]
  }
}

let message = '<b>Personal Area\nYour subscription: no active subscription</b>'

export default async function (ctx) {
  if (ctx.message) {
    ctx.reply(message, extra)
  } else {
    ctx.answerCbQuery();
    ctx.editMessageText(message, extra);
  }
  ctx.wizard.selectStep(4)
}