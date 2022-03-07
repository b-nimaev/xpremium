import { Context, Scenes } from "telegraf";

interface MyWizardSession extends Scenes.WizardSessionData {
    myWizardSessionProp: number,
}

interface MySession extends Scenes.WizardSession<MyWizardSession> {
    mySessionProp: number,
    lastUpdate: number,
    cursor: number
}

export default interface context extends Context {
    payment: string,
    plan: string,
    session: MySession
    scene: Scenes.SceneContextScene<context, MyWizardSession>
    wizard: Scenes.WizardContextWizard<context>
}