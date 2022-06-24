#!/usr/bin/env node

import { chatbotOptions } from "./config.js";
import { httpCtrl } from './core.js';

/* Http chatbot control server (http://localhost:3000/) */
/* -----------------------------------------------------*/
httpCtrl("chatbotSession", chatbotOptions.httpCtrl.port);
