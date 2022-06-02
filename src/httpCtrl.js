#!/usr/bin/env node

import { httpCtrl } from './core.js';

/* Http chatbot control server (http://localhost:3000/) */
/* -----------------------------------------------------*/
httpCtrl("chatbotSession", 3000);
