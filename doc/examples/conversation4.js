import { remoteImg } from "../helpers";

const customEndpoint = "https://jordifernandes.com/examples/chatbot";

/**
 * Chatbot conversation flow
 * Example 4
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /.*/, // Match all
    message: "Image local and remote! Send [local] or [remote]",
  },
  {
    id: 2,
    parent: 1,
    pattern: /local/, 
    image: "./images/image1.jpg",
    end: true,
  },
  {
    id: 3,
    parent: 1,
    pattern: /remote/, 
    image: remoteImg(`${customEndpoint}/image1.jpg`),
    end: true,
  },
];
