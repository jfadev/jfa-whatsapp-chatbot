import { remoteImg } from "./helpers.js";

const customEndpoint = "https://jordifernandes.com/examples/chatbot";
var inputs = [];

/**
 * Chatbot conversation flow
 * Example 3
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /.*/, // Match all
    message: "Hello! I am a Delivery Chatbot. Send a menu item number!",
  },
  {
    id: 2,
    parent: 0, // Same parent (send reply id=1 and id=2)
    pattern: /.*/, // Match all
    image: remoteImg(`${customEndpoint}/menu.jpg`),
  },
  {
    id: 3,
    parent: 1, // Relation with id: 1
    pattern: /\d+/, // Match any number
    message: "You are choise item number $input. How many units do you want?",
  },  
  {
    id: 4,
    parent: 2, // Relation with id: 2
    pattern: /\d+/, // Match any number
    message: "You are choise $input units. How many units do you want?",
    // Inject custom code or overwrite output 'message' property before reply
    beforeReply(from, input, output) {
      // Example check external api and overwrite output 'message'
      const response = await fetch(
        `${customEndpoint}/delivery-check-stock.php/?item=${input}&qty=`
      ).then((res) => res.json());
      return response.stock === 0
        ? "Item number $input is not avilable in this moment!"
        : output;
    },
  },
];
