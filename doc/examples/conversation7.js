import fetch from "sync-fetch";

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
    afterReply(from, input, parents) {
      // Send whatsapp number to external api
      const response = fetch(`${customEndpoint}/number-lead.php/`, {
        method: "POST",
        body: JSON.stringify({ number: from }),
        headers: { "Content-Type": "application/json" },
      }).json();
      console.log("response:", response);
    },
    end: true,
  },
];
