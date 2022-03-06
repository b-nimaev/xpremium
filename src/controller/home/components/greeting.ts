import Context from "../../../types";
import Messages from "./messages";
import Keyboard from "./keyboard";

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
