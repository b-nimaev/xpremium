
export default async function renderConfirmationSection(ctx) {

  let confirmationMessage = "<b>Send in chat proof of payment. It can be a screenshot, payment ID or something that will confirm your payment.</b>"
  let extra = {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [{ text: "« Back", callback_data: "back" }]
      ]
    }
  }

  ctx.wizard.selectStep(3)
  if (ctx.message) {
    ctx.reply(confirmationMessage, extra)
  } else {
    ctx.editMessageText(confirmationMessage, extra)
  }
}