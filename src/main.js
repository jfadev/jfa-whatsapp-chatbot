#!/usr/bin/env node

import venom from 'venom-bot';
import venomOptions from './config.js';
import { start } from './functions.js';
import conversation from './conversation.js';

console.log('########################');
console.log('# Jfa Whatsapp Chatbot #');
console.log('########################');

/* Single whatsapp account */
/* ------------------------*/
venom
  .create("chatbotSession", null, null, venomOptions)
  .then(client => start(client, conversation))
  .catch(err => console.log(err));


/* Multiple whatsapp accounts */
/* ---------------------------*/
// import conversation1 from './conversation1.js';
// import conversation2 from './conversation2.js';

// venom
//   .create("account1ChatbotSession", null, null, venomOptions)
//   .then(client => start(client, conversation1))
//   .catch(err => console.log(err));

// venom
//   .create("account2ChatbotSession", null, null, venomOptions)
//   .then(client => start(client, conversation2))
//   .catch(err => console.log(err));