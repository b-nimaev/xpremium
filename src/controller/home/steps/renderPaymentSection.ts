import Context from '../../../types/types'
import Messages from '../../../components/Messages'
import Keyboard from '../../../components/Keyboard'

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
