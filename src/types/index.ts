import { Context, Scenes } from "telegraf";
import { Message, User } from "telegraf/typings/core/types/typegram";

interface MyWizardSession extends Scenes.WizardSessionData {
  myWizardSessionProp: number;
}

interface MySession extends Scenes.WizardSession<MyWizardSession> {
  plan: string;
  payment: string;
  mySessionProp: number;
  UserProposal: UserProposalI;
  proposals: any;
  cursor: number;
  data: any
}

export interface MyContext extends Context {
  match: any;
  update: any;
  telegram: any;
  session: MySession;
  scene: Scenes.SceneContextScene<MyContext, MyWizardSession>;
  wizard: Scenes.WizardContextWizard<MyContext>;
}

export interface UserProposalI extends User {
  plan: string;
  payment: string;
  subscription: boolean;
  message: any;
  lastModified: number
}