import Context from "../../../types/types";
import Messages from "../../../components/Messages";
import Keyboard from "../../../components/Keyboard";

export default async (ctx: Context) => {
  try {
    ctx.editMessageText(Messages.greetingMessage, {
      parse_mode: "HTML",
      ...Keyboard.greetingKeyboard,
    });
    ctx.answerCbQuery()
  } catch (err) {
    ctx.reply(Messages.greetingMessage, {
      parse_mode: "HTML",
      ...Keyboard.greetingKeyboard,
    });
  }
  ctx.wizard.selectStep(0)
};
