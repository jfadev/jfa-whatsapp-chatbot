// import { buttons, remoteTxt, remoteJson, remoteImg } from "../helpers";

/**
 * Chatbot conversation flow
 * Your custom conversation
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /hi|hello/,
    message: "Welcome to Jfa WhatsApp Chatbot!",
    end: true,
  },
];