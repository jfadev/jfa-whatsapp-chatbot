#!/usr/bin/env node

import venom from 'venom-bot';
import venomOptions from './config.js';
import { start } from './funtions.js';
import conversation from './conversation.js';

console.log('########## Jfa Whatsapp Chatbot ##########');
venom
  .create("chatbotSession", null, null, venomOptions)
  .then(client => start(client, conversation))
  .catch(err => console.log(err));
