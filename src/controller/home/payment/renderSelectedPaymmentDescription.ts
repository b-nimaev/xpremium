let messages = {
  cryptoPay: `<b>Crypto</b> \n\nWallet: USDT \nAddress: <code>TPXqExfPbXBWjum98PsHuJ916b9EkQKPN2</code> \nNetwork: TRC20 \nWallet: BTC \nAddress: <code>0x520a98177b6e6cb286c3fc1b19a719daea2b6cf2</code> \nNetwork: Binance Smart Chain \nWallet: BTC \nAddress: <code>14R9wSycdWe4GTPVy3qG4d2ih8MZH9W4et</code> \nNetwork: Bitcoin \n Wallet: BTC \nAddress: <code>bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23</code> \nNetwork: Binance Chain (BEP2) \nMEMO: 364451047 \n<b>*You can click on address and it will copy to your clipboard</b> \n\n`,
  skrill: `<b>Skrill</b> \n\nEmail: sergeisemenovfx@gmail.com \nFees: make sure you send 7.5% more than the subscription amount. If you send less, you will not receive a subscription. \n\n`,
  card: ` <b>Visa & MasterCard</b> \n\nMethod: you must register on the site wise.com \nFees:  make sure you send 2% more than the subscription amount. If you send less, you will not receive a subscription. \nDetailed instructions can be found at this link - Click on me to get video-instructions (http://www.youtube.com/watch?v=IZtLF0nhqFc) \n\n`
}

let title = {
  forex: 'Forex signals - 49$ per month',
  crypto: 'Crypto signals - 49$ per month',
  copy: 'Copy signals - 149$ per month',
}


let extra = {
  parse_mode: 'HTML',
  reply_markup: {
    inline_keyboard: [
      [{ text: "Confirm payment", callback_data: "confirm" }],
      [{ text: "« Back", callback_data: "back" }]
    ]
  }
}

export default async function (ctx) {
  
  let message = `<b>${title[ctx.session.plan]} \nSelected payment: ${messages[ctx.session.payment]}</b>`

  ctx.wizard.selectStep(2)
  if (ctx.message) {
    ctx.reply(message, extra)
  } else {
    let payment = ctx.match[1]
    if (typeof(payment) == "string") {
      ctx.session.payment = payment
    }
    let message = `<b>${title[ctx.session.plan]} \nSelected payment: ${messages[ctx.session.payment]}</b>`
    ctx.editMessageText(message, extra)
    ctx.answerCbQuery()
  }
 
}
