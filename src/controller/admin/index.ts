import { Composer, Scenes } from "telegraf";
import { config } from "dotenv";
config();

import { context } from "../../types/types";

const handler = new Composer<context>(); // 0
const admin = new Scenes.WizardScene(
  "admin",
  handler, // 0
);

admin.enter((ctx) => { console.log("hi admin") })

export default admin