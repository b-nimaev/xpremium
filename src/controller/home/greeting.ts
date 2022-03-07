let extra = {
  parse_mode: 'HTML',
  reply_markup: {
    inline_keyboard: [
      [{ text: "Forex signals - 49$ per month", callback_data: "plan forex"}],
      [{ text: "Crypto signals - 49$ per month", callback_data: "plan crypto"}],
      [{ text: "Copy signals - 49$ per month", callback_data: "plan copy"}],
      [{ text: "Dashboard", callback_data: "dashboard"}]
    ]
  }
}

let message = `In order to become a member of premium signals, you need to choose which subscription you need. Daily receipt of 5 to 10 signals!\n\n By purchasing our signals, you get access to trading strategies that are a guaranteed guarantee of your success! If our signals do not bring you profit, we will return the funds!\n\n Choose from the list below 👇`

export default async function greeting(ctx?: any) {
  if (ctx.message) { 
    ctx.reply(message, extra) 
  } else {
    ctx.editMessageText(message, extra);
    ctx.answerCbQuery();
  }
  ctx.wizard.selectStep(0);
}