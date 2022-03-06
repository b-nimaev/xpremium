import { checkUser, getProposals } from "../../../services/services";
import { context } from "../../../types/types";
import keyboard from "../../../components/Keyboard";
import timeConverter from "../../../includes/timeConverter";

export default async function (ctx: context) {
  try {
    let isExist = await checkUser(ctx);
    let props = await getProposals();
    if (isExist) {
      ctx.wizard.selectStep(4);

      var message = `<b>New proposals: ${props.count}</b>\n\n`;

      props.array.forEach(async (element) => {
        if (element.username) {
          message += `Username: @${element.username} \n`;
        }

        message += `First name: ${element.first_name} \n`;
        message += `Date: ${timeConverter(element.time)} \n`;
        message += `Plans: ${element.plan} \n`;
        message += `ID: ${element.id} \n`;
        message += `Language: ${element.language_code} \n\n`;
      });

      // message += `/help more commands`;
      ctx.reply(message, { parse_mode: 'HTML' })
      // return await ctx.reply(message, { parse_mode: "HTML" });
    } else {
      return ctx.reply("Error! Not enough privileges.", keyboard.back);
    }
  } catch (err) {
    console.log(err);
  }
}
