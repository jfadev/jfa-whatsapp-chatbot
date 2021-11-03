// Start listen whatsapp messages
export async function start(client, replies) {
  console.log("Chatbot started...");
  let parentReply = 0;
  client.onMessage(async (message) => {
    const body = message.body.toLowerCase();
    const reply = replies.find((o) => o.pattern.test(body));
    if (reply && message.isGroupMsg === false) {
      if (reply.parent === parentReply) {
        console.log("Watch: ", reply.pattern);
        parentReply = reply.id;
        if (reply.hasOwnProperty('link')) {
          await client
            .sendLinkPreview(message.from, reply.link, reply.message)
            .then(result => console.log("Result (sendLinkPreview): ", result.to.remote.user))
            .catch(err => console.error("Error (sendLinkPreview): ", err));
        } else if (reply.hasOwnProperty('buttons')) {
          await client
            .sendButtons(message.from, '', reply.buttons, reply.message)
            .then(result => console.log("Result (sendButtons): ", result.to.remote.user))
            .catch(err => console.error("Error (sendButtons): ", err));
        } else {  
          await client
            .sendText(message.from, reply.message)
            .then(result => console.log("Result (sendText): ", result.to.remote.user))
            .catch(err => console.error("Error (sendText): ", err));
        }
      }
    }
  });
}
