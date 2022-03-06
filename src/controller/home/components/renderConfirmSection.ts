import Context from '../../../types'
import Messages from './messages'
import Keyboard from './keyboard'

export default async function (ctx: Context) {
  if (ctx.message) {
    if (ctx.session.payment == "crypto") {
      ctx.reply(Messages.crytoPaymentMessage, {
        parse_mode: "HTML",
        ...Keyboard.confirmPayment,
      });
    } else if (ctx.session.payment == "skrill") {
      ctx.reply(Messages.skrillPaymentMessage, {
        parse_mode: "HTML",
        ...Keyboard.confirmPayment,
      });
    } else if (ctx.session.payment == "vmc") {
      ctx.reply(Messages.paymentVisaMC, {
        parse_mode: "HTML",
        ...Keyboard.confirmPayment,
      });
    }
  } else {
    if (ctx.session.payment == "crypto") {
      ctx.editMessageText(Messages.crytoPaymentMessage, {
        parse_mode: "HTML",
        ...Keyboard.confirmPayment,
      });
    } else if (ctx.session.payment == "skrill") {
      ctx.editMessageText(Messages.skrillPaymentMessage, {
        parse_mode: "HTML",
        ...Keyboard.confirmPayment,
      });
    } else if (ctx.session.payment == "vmc") {
      ctx.editMessageText(Messages.paymentVisaMC, {
        parse_mode: "HTML",
        ...Keyboard.confirmPayment,
      });
    }
    ctx.answerCbQuery();
  }
}
