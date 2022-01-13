#!/usr/bin/env node

import { session } from './core.js';
import conversation from './conversations/conversation1.js';
// import conversation1 from './conversations/conversation1.js';
// import conversation2 from './conversations/conversation2.js';

/* Single whatsapp account */
/* ------------------------*/
session("chatbotSession", conversation);

/* Multiple whatsapp accounts */
/* ---------------------------*/
// session("chatbotSession", conversation1);
// session("chatbotSession", conversation2);
// ...
/* ---------------------------*/