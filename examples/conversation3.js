import { remoteImg } from "./functions.js";

const customEndpoint = "https://jordifernandes.com/examples/chatbot";

/**
 * Chatbot conversation flow
 * Example 3
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /.*/,
    message: "Hello! I am a Delivery Chatbot. Send a menu item number!",
    image: remoteImg(`${customEndpoint}/menu.jpg`),
  },
  {
    id: 2,
    parent: 1, // Relation with id: 1
    pattern: /\d+/,
    message: "You are choise item number $input. How many units do you want?",
    // Inject custom code or overwrite 'message' property before repy
    beforeReply(from, input, output) {
      const response = await fetch(
        `${customEndpoint}/delivery-check-items.php/?item=${input}`
      ).then((res) => res.json());
      return response.stock === 0
        ? "Item number $input is not avilable in this moment!"
        : output;
    },
  },
  {
    id: 3,
    parent: 2, // Relation with id: 2
    pattern: /\d+/,
    message: "You are choise $input units. How many units do you want?",
    // Inject custom code after reply
    afterReply(from, input) {
      // saveRemote(`${customEndpoint}/delivery-order.php`, {
      //   date: Date.now(),
      //   from: from,
      //   units: input,
      // });
      // saveLocal("./orders.json", {
      //   date: Date.now(),
      //   from: from,
      //   units: input,
      // });
    },
  },
];
