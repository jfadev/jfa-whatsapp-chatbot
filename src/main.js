#!/usr/bin/env node

// import schedule from "node-schedule";
import { session, log } from "./core";
import conversation from "./conversations/conversation";
// import conversation1 from './conversations/conversation1.js';
// import conversation2 from './conversations/conversation2.js';

try {
  /* Single WhatsApp account */
  /* ------------------------*/
  session("chatbotSession", conversation);
  // OR:
  // const chatbot = await session("chatbotSession", conversation);
  /* ---------------------------*/

  /* Multiple WhatsApp accounts */
  /* ---------------------------*/
  // session("chatbotSession", conversation1);
  // session("chatbotSession", conversation2);
  // OR:
  // const chatbot1 = await session("chatbotSession", conversation1);
  // const chatbot2 = await session("chatbotSession", conversation2);
  // ...
  /* ---------------------------*/

  /* Schedule Jobs */
  /* ---------------------------*/
  // const job1 = schedule.scheduleJob(
  //   jobsOptions.job1.rule,
  //   async () => {
  //     // custom logic
  //   }
  // );
  /* ---------------------------*/
} catch (error) {
  console.log("error", error.toString());
  log("Error", `${error.toString()} Please try restart de bot.`);
}
