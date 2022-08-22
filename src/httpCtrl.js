#!/usr/bin/env node

import { chatbotOptions } from "./config";
import { httpCtrl } from "./core";

/* Http chatbot control server (http://localhost:3000/) */
/* -----------------------------------------------------*/
httpCtrl("chatbotSession", chatbotOptions.httpCtrl.port);
