const customEndpoint = "https://jordifernandes.com/examples/chatbot";

/**
 * Chatbot conversation flow
 * Example 7
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /.*/, // Match all
    message: "Hello!",
    // Inject custom code after reply
    afterReply(from, input) {
      // Send whatsapp number to external api
      await fetch(`${customEndpoint}/number-lead.php/`, {
        method: "POST",
        body: JSON.stringify({ number: from }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
  },
];
