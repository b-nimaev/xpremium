import { Composer } from "telegraf";
import Keyboard from "../../../../components/Keyboard";
import Messages from "../../../../components/Messages";
import { context } from "../../../../types/types";
import { greeting } from "../../home";
import renderPaymentSection from "./renderPaymentSection";

class confirmationMessage {
  step: Composer<context>;
  
  constructor() {
    this.step = new Composer<context>();
  }
}

const Payment = new confirmationMessage();
const PaymentComposer = Payment.step;

PaymentComposer.action("paymentCrypto", async (ctx) => {
  ctx.answerCbQuery();
  ctx.session.payment = "crypto";
  ctx.editMessageText(Messages.crytoPaymentMessage, {
    parse_mode: "HTML",
    ...Keyboard.confirmPayment,
  });
  ctx.wizard.selectStep(2);
});

PaymentComposer.action("paymentSkrill", async (ctx) => {
  ctx.answerCbQuery();
  ctx.session.payment = "skrill";
  ctx.editMessageText(Messages.skrillPaymentMessage, {
    parse_mode: "HTML",
    ...Keyboard.confirmPayment,
  });
  ctx.wizard.selectStep(2);
});

PaymentComposer.action("paymentVisaMC", async (ctx) => {
  ctx.answerCbQuery();
  ctx.session.payment = "vmc";
  ctx.editMessageText(Messages.paymentVisaMC, {
    parse_mode: "HTML",
    ...Keyboard.confirmPayment,
  });
  ctx.wizard.selectStep(2);
});

PaymentComposer.action("back", async (ctx) => {
  greeting(ctx);
  ctx.wizard.selectStep(0);
  ctx.answerCbQuery();
});
PaymentComposer.on("message", async (ctx) => renderPaymentSection(ctx));
export default PaymentComposer;
