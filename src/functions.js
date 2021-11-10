/**
 * Start run listener of whatsapp messages
 * @param {Object} client
 * @param {Array} replies
 */
export async function start(client, replies) {
  console.log("[Chatbot] started...");
  try {
    let parentReply = 0;
    client.onMessage(async (message) => {
      const body = message.body.toLowerCase();
      const reply = replies.find((o) => o.pattern.test(body));
      if (reply && message.isGroupMsg === false) {
        if (reply.parent === parentReply) {
          console.log("Read: ", reply.pattern);
          if (reply.hasOwnProperty("beforeReply")) {
            reply.beforeReply(message.from, body);
          }
          parentReply = reply.id;
          if (reply.hasOwnProperty("link")) {
            await client
              .sendLinkPreview(message.from, reply.link, reply.message)
              .then((result) =>
                console.log(
                  "Write (sendLinkPreview): ",
                  message.from,
                  ">",
                  result.to.remote._serialized,
                  ":",
                  reply.message
                )
              )
              .catch((err) => console.error("Error (sendLinkPreview): ", err));
          } else if (
            reply.hasOwnProperty("buttons") &&
            reply.hasOwnProperty("description")
          ) {
            await client
              .sendButtons(
                message.from,
                reply.message,
                reply.buttons,
                reply.description
              )
              .then((result) =>
                console.log(
                  "Write (sendButtons): ",
                  message.from,
                  ">",
                  result.to.remote._serialized,
                  ":",
                  reply.message
                )
              )
              .catch((err) => console.error("Error (sendButtons): ", err));
          } else {
            await client
              .sendText(message.from, reply.message)
              .then((result) =>
                console.log(
                  "Write (sendText): ",
                  message.from,
                  ">",
                  result.to.remote._serialized,
                  ":",
                  reply.message
                )
              )
              .catch((err) => console.error("Error (sendText): ", err));
          }
          if (reply.hasOwnProperty("afterReply")) {
            reply.afterReply(message.from, body);
          }
        }
      }
    });
  } catch (err) {
    client.close();
    console.error("Error: ", err);
  }
}

/**
 * Create buttons
 * @param {Array} buttonTexts
 */
export function buttons(buttonTexts) {
  let buttons = [];
  buttonTexts.forEach((text) => {
    buttons.push({
      buttonText: {
        displayText: text,
      },
    });
    return buttons;
  });
}

/**
 * Get remote TXT file
 * @param {String} url
 * @param {Number|null} cacheDelay
 * @returns
 */
export async function remoteTxt(url, cacheDelay = null) {
  const response = await fetch(url)
    .then((res) => res.text())
    .catch((err) => console.error("Error (remoteTxt): ", err));
  return response;
}

/**
 * Get remote JSON file
 * @param {String} url
 * @param {Number|null} cacheDelay
 * @returns
 */
export async function remoteJson(url, cacheDelay = null) {
  const response = await fetch(url)
    .then((res) => res.json())
    .catch((err) => console.error("Error (remoteJson): ", err));
  return response;
}

/**
 * Get remote Image (jpg, png, gif) file
 * @param {String} url
 * @param {Number|null} cacheDelay
 * @returns
 */
export async function remoteImg(url, cacheDelay = null) {
  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };
  const response = await fetch(url)
    .then((res) => res.blob())
    .then(blobToBase64)
    .catch((err) => console.error("Error (remoteImg): ", err));
  return response;
}
