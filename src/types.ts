import { Context, Scenes } from "telegraf";
import { Chat } from "typegram";

interface MyWizardSession extends Scenes.WizardSessionData {
    myWizardSessionProp: number,
}

interface MySession extends Scenes.WizardSession<MyWizardSession> {
    mySessionProp: number,
    payment: string,
    single: string,
    lastUpdate: number,
    cursor: number
}

export default interface context extends Context {
    session: MySession
    scene: Scenes.SceneContextScene<context, MyWizardSession>
    wizard: Scenes.WizardContextWizard<context>
}