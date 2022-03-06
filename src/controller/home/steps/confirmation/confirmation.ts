import { Composer } from "telegraf";
import { setProposal } from "../../../../services/services";
import { context } from "../../../../types/types";
import { greeting } from "../../home";
import renderPaymentSection from "../payment/renderConfirmSection";
import confirmation from "./confirmConfirmation";

class confirmationMessage {
  step: Composer<context>;
  
  constructor() {
    this.step = new Composer<context>();
  }
}

const Confirmation = new confirmationMessage();
const wizard = Confirmation.step;

wizard.on("message", async (ctx) => confirmation(ctx));
wizard.action("back", async (ctx) => renderPaymentSection(ctx));
wizard.action("confirm", async (ctx) => {

  try {

    await setProposal(ctx.session.proposal);
    await greeting(ctx)

  } catch (err) {

    return err
  
  }

});

export default wizard;
