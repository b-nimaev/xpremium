import { Context, Scenes } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";
import { ExtraDocument, ExtraPhoto } from "telegraf/typings/telegram-types";

interface MyWizardSession extends Scenes.WizardSessionData {
  myWizardSessionProp: number;
}

interface MySession extends Scenes.WizardSession<MyWizardSession> {
  mySessionProp: number;
  payment: string;
  single: string;
  proposal?: proposal;
  cursor: number;
}

interface context extends Context {
  session: MySession;
  scene: Scenes.SceneContextScene<context, MyWizardSession>;
  wizard: Scenes.WizardContextWizard<context>;
}

interface proposal {
  plan: string;
  payment: string;
  subscription: boolean;
  date: number;

  confirmation: {
    message?: Message;
    photo?: ExtraPhoto;
    document?: ExtraDocument;
  };
}

export { context, proposal }