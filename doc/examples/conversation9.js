/**
 * Chatbot conversation flow
 * Example 9
 */
 export default [
  {
    id: 1,
    parent: 0,
    pattern: /.*/, // Match all
    message: "",
    // Inject custom code or overwrite output 'message' property before reply
    beforeReply(from, input, output, parents, media) {
      if (media) {
        console.log("media buffer", media.buffer);
        return `You send file with .${media.extension} extension!`;
      } else {
        return "Send a picture please!";
      }
    },
    end: true,
  },
];