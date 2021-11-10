import { remoteImg, sendData } from "./functions.js";

/**
 * Chatbot conversation flow
 * Example 3
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /.*/,
    message: "Hello! I am a Delivery Chatbot. Send a number!",
    image: remoteImg("https://jordifernandes.com/examples/chatbot/menu.jpg"),
  },
  {
    id: 2,
    parent: 1, // Relation with id: 1
    pattern: /\d+/,
    message: "You are choise item number $input. How many units do you want?",
    // beforeReply(from, input) {},
  },
  {
    id: 3,
    parent: 2, // Relation with id: 2
    pattern: /\d+/,
    message: "You are choise $input units. How many units do you want?",
    afterReply(from, input) {
      sendData("https://jordifernandes.com/examples/chatbot/delivery-order.php", {
        units: input,
      });
      saveData("./orders.json", {
        date: Date.now(),
        from: from,
        units: input,
      });
    },
  },
];
