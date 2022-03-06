import Context from '../../../types'
import Messages from './messages'
import Keyboard from './keyboard'

export default function renderPaymentSection(ctx: Context) {
  if (ctx.session.single == "crypto") {
    if (ctx.message) {
      ctx.reply(Messages.cryptoSignalsMessage, {
        parse_mode: "HTML",
        ...Keyboard.paymentKeyboard,
      });
    } else {
      ctx.answerCbQuery()
      ctx.wizard.selectStep(1);
      ctx.editMessageText(Messages.cryptoSignalsMessage, {
        parse_mode: "HTML",
        ...Keyboard.paymentKeyboard,
      });
    }
  } else if (ctx.session.single == "forex") {
    if (ctx.message) {
      ctx.reply(Messages.forexSignalsMessage, {
        parse_mode: "HTML",
        ...Keyboard.paymentKeyboard,
      });
    } else {
      ctx.answerCbQuery()
      ctx.wizard.selectStep(1);
      ctx.editMessageText(Messages.forexSignalsMessage, {
        parse_mode: "HTML",
        ...Keyboard.paymentKeyboard,
      });
    }
  }
}
