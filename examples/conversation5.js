import { remoteImg } from "./helpers.js";

const customEndpoint = "https://jordifernandes.com/examples/chatbot";

/**
 * Chatbot conversation flow
 * Example 5
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /.*/, // Match all
    message: "Audio local and remote! Send [local] or [remote]",
  },
  {
    id: 2,
    parent: 1,
    pattern: /local/, 
    voice: "./audios/audio1.mp3",
  },
  {
    id: 3,
    parent: 1,
    pattern: /remote/, 
    voice: remoteAudio(`${customEndpoint}/audio1.mp3`),
  },
];
