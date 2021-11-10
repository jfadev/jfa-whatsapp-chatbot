import { buttons, remoteTxt, remoteImg } from "./functions.js";

/**
 * Chatbot conversation flow
 * Example 2
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /.*/,
    message: "Hello! I am a Delivery Chatbot.",
    description: "Choice one option!",
    buttons: buttons([
      "See today's menu?",
      "Order directly!",
      "Talk to a human!",
    ]),
  },
  {
    id: 2,
    parent: 1, // Relation with id: 1
    pattern: /menu/,
    message: remoteTxt("https://jordifernandes.com/examples/chatbot/menu.txt"),
    // message: remoteImg("https://jordifernandes.com/examples/chatbot/menu.jpg"),
    // message: remoteJson(
    //   "https://jordifernandes.com/examples/chatbot/menu.json"
    // )[0].message,
  },
  {
    id: 3,
    parent: 1, // Relation with id: 1
    pattern: /order/,
    message: "Make a order!",
    link: "https://jordifernandes.com/examples/chatbot/delivery-order.php",
  },
  {
    id: 4,
    parent: 1, // Relation with id: 1
    pattern: /human/,
    message: "Please call the following whatsapp number: +1 206 555 0100",
  },
];
