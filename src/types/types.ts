import { Context, Scenes } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";
import { ExtraDocument, ExtraPhoto } from "telegraf/typings/telegram-types";

interface MyWizardSession extends Scenes.WizardSessionData {
  myWizardSessionProp: number;
}

interface MySession extends Scenes.WizardSession<MyWizardSession> {
  plan: string;
  payment: string;
  mySessionProp: number;
  proposal?: proposal;
  proposals: any;
  cursor: number;
}

interface context extends Context {
  session: MySession;
  scene: Scenes.SceneContextScene<context, MyWizardSession>;
  wizard: Scenes.WizardContextWizard<context>;
}

interface proposal {
  id: number;
  username?: string;
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