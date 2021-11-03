// Start listen whatsapp messages
export async function start(client, replies) {
  console.log("Chatbot started...");
  let parentReply = 0;
  client.onAnyMessage(async (message) => {
    const body = message.body.toLowerCase();
    const reply = replies.find((o) => o.pattern.test(body));
    if (reply && message.isGroupMsg === false) {
      if (reply.parent === parentReply) {
        console.log("Watch pattern: ", reply.pattern);
        parentReply = reply.id;
        await client
          .sendText(message.from, reply.message)
          .then(result => console.log("Result: ", result))
          .catch(err => console.error("Error: ", err));
      }
    }
  });
}
