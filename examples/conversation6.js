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
      const response = await fetch(
        `${customEndpoint}/ai-reply.php/?input=${input}`
      ).then((res) => res.json());
      return response.message;
    },
  },
];
