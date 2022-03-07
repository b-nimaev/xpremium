let title = {
  forex: 'Forex signals - 49$ per month',
  crypto: 'Crypto signals - 49$ per month',
  copy: 'Copy signals - 149$ per month',
}

let messages = {
  forex: `
    <b>${title.forex}</b>
    \nQuality and proven forex/gold/indices signals. The percentage of successful trades is about 90%, the monthly pips plan is 3000. Intraday and scalping deals
    \nSelect a payment method 👇
    `,

  crypto: `
    <b>${title.crypto}</b>
    \nQuality and proven crypto signals. Intraday signals, with levarage. Futures + spot deals. Access to futures trading signals like Binance, okex, bybit, huobi.
    `,

  copy: `
    <b>${title.copy}</b>
    \nCopy forex signals on your forex account. Any brokers. Minimum deposit - 2000$. No split or profit share. Copying with stop loss and take profit. With all sell and buy limits.
    `,
}

let extra = {
  parse_mode: 'HTML',
  reply_markup: {
    inline_keyboard: [
      [{ text: "Crypto", callback_data: "payment cryptoPay" }],
      [{ text: "Skrill", callback_data: "payment skrill" }],
      [{ text: "Visa & MasterCard", callback_data: "payment card" }],
      [{ text: "« Back", callback_data: "back" }]
    ]
  }
}

export default async function (ctx) {
  ctx.wizard.selectStep(1)
  
  if (ctx.message) {
    ctx.reply(messages[ctx.session.plan], extra)
  } else {
    let plan = ctx.match[1]
    if (typeof(plan) == "string") {
      ctx.session.plan = ctx.match[1]
      ctx.editMessageText(messages[ctx.session.plan], extra)
    } else {
      try {
        ctx.editMessageText(messages[ctx.session.plan], extra)
      } catch (err) {
        console.log(err)
      }
    }
    console.log(plan)
    ctx.answerCbQuery()
    console.log(ctx.session)
  }
}