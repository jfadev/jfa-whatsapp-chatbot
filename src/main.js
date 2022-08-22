#!/usr/bin/env node

import { session } from './core.js';
import conversation from './conversations/conversation.js';
// import conversation1 from './conversations/conversation1.js';
// import conversation2 from './conversations/conversation2.js';

/* Single WhatsApp account */
/* ------------------------*/
session("chatbotSession", conversation);

/* Multiple WhatsApp accounts */
/* ---------------------------*/
// session("chatbotSession", conversation1);
// session("chatbotSession", conversation2);
// ...
/* ---------------------------*/