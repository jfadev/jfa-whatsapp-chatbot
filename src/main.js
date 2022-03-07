#!/usr/bin/env node

import { session, httpCtrl } from './core.js';
import conversation from './conversations/conversation.js';
// import conversation1 from './conversations/conversation1.js';
// import conversation2 from './conversations/conversation2.js';

/* Http chatbot control server (http://localhost:3000/) */
/* -----------------------------------------------------*/
// httpCtrl("chatbotSession", 3000);

/* Single whatsapp account */
/* ------------------------*/
session("chatbotSession", conversation);

/* Multiple whatsapp accounts */
/* ---------------------------*/
// session("chatbotSession", conversation1);
// session("chatbotSession", conversation2);
// ...
/* ---------------------------*/