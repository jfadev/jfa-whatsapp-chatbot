import fetch from "sync-fetch";

const customEndpoint = "https://jordifernandes.com/examples/chatbot";

/**
 * Chatbot conversation flow
 * Example 6
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /.*/, // Match all
    message: "",
    // Inject custom code or overwrite output 'message' property before reply
    beforeReply(from, input, output, parents) {
      // Get reply from external api and overwrite output 'message'
      const response = fetch(`${customEndpoint}/ai-reply.php/?input=${input}`).json();
      return response.message;
    },
    end: true,
  },
];
