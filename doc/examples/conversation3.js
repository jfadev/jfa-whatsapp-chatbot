import fetch from "sync-fetch";
import { remoteImg } from "../helpers";

const customEndpoint = "https://jordifernandes.com/examples/chatbot";

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
    message: "You are choice item number $input. How many units do you want?", // Inject input value ($input) in message
  },  
  {
    id: 4,
    parent: 2, // Relation with id: 2
    pattern: /\d+/, // Match any number
    message: "You are choice $input units. How many units do you want?",
    // Inject custom code or overwrite output 'message' property before reply
    beforeReply(from, input, output, parents) {
      // Example check external api and overwrite output 'message'
      const response = fetch(
        `${customEndpoint}/delivery-check-stock.php/?item=${input}&qty=${parents.pop()}`
      ).json();
      return response.stock === 0
        ? "Item number $input is not available in this moment!"
        : output;
    },
    end: true,
  },
];
