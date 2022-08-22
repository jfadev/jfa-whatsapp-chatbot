import { remoteImg } from "../helpers";

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
    audio: "./audios/audio1.mp3",
    end: true,
  },
  {
    id: 3,
    parent: 1,
    pattern: /remote/, 
    audio: remoteAudio(`${customEndpoint}/audio1.mp3`),
    end: true,
  },
];
