import { Composer } from "telegraf";
import context from "../../../../types/types";
import renderPaymentSection from "../renderConfirmSection";
import checkConfirmationData from "./checkConfirmationData";

class confirmationMessage {
  step: Composer<context>;
  constructor() {
    this.step = new Composer<context>();
  }
}

const wizardStep = new confirmationMessage();
const wizard = wizardStep.step
wizard.on("message", async (ctx) => checkConfirmationData(ctx));
wizard.action("back", async (ctx) => renderPaymentSection(ctx));

export default wizardStep;
