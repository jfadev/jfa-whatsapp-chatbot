/**
 * Start run listener of whatsapp messages
 * @param {Object} client
 * @param {Array} conversation
 */
export async function start(client, conversation) {
  console.log("[Chatbot] started...");
  try {
    let parent = 0;
    let parents = [];
    // client.onAnyMessage(async (message) => {
    client.onMessage(async (message) => {
      const input = message.body.toLowerCase();
      let reply = conversation.find((o) => o.pattern.test(input));
      if (reply && message.isGroupMsg === false) {
        if (reply.parent === parent) {
          console.log("Read: ", reply.pattern);
          parent = reply.id;
          if (reply.hasOwnProperty("beforeReply")) {
            reply.message = reply.beforeReply(
              message.from,
              input,
              reply.message,
              parents
            );
          }
          reply.message = reply.message.replace(/\$input/g, input);
          await watchSendLinkPreview(client, message, reply);
          await watchSendButtons(client, message, reply);
          await watchSendImage(client, message, reply);
          await watchSendAudio(client, message, reply);
          await watchSendText(client, message, reply);
          if (reply.hasOwnProperty("afterReply")) {
            reply.afterReply(message.from, input, parents);
          }
          parents.push({ id: reply.id, input: input });
        }
      }
    });
  } catch (err) {
    client.close();
    console.error("Error: ", err);
  }
}

/**
 *
 * @param {Object} client
 * @param {Object} message
 * @param {Object} reply
 */
async function watchSendLinkPreview(client, message, reply) {
  if (reply.hasOwnProperty("link") && reply.hasOwnProperty("message")) {
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
  }
}

/**
 *
 * @param {Object} client
 * @param {Object} message
 * @param {Object} reply
 */
async function watchSendButtons(client, message, reply) {
  if (
    reply.hasOwnProperty("buttons") &&
    reply.hasOwnProperty("description") &&
    reply.hasOwnProperty("message")
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
  }
}

/**
 * Send image file (jpg, png, gif)
 * @param {Object} client
 * @param {Object} message
 * @param {Object} reply
 */
async function watchSendImage(client, message, reply) {
  if (reply.hasOwnProperty("image")) {
    if (
      reply.image.hasOwnProperty("base64") &&
      reply.image.hasOwnProperty("filename")
    ) {
      await client
        .sendImageFromBase64(
          message.from,
          message.image.base64,
          message.filename
        )
        .then((result) =>
          console.log(
            "Write (sendImage b64): ",
            message.from,
            ">",
            result.to.remote._serialized,
            ":",
            reply.voice
          )
        )
        .catch((err) => console.error("Error (sendImage b64): ", err));
    } else {
      await client
        .sendImage(message.from, message.image, message.filename, "")
        .then((result) =>
          console.log(
            "Write (sendImage): ",
            message.from,
            ">",
            result.to.remote._serialized,
            ":",
            reply.voice
          )
        )
        .catch((err) => console.error("Error (sendImage): ", err));
    }
  }
}

/**
 * Send audio file MP3
 * @param {Object} client
 * @param {Object} message
 * @param {Object} reply
 */
async function watchSendAudio(client, message, reply) {
  if (reply.hasOwnProperty("audio")) {
    if (
      reply.image.hasOwnProperty("base64") &&
      reply.image.hasOwnProperty("filename")
    ) {
      await client
        .sendVoiceBase64(message.from, message.audio.base64)
        .then((result) =>
          console.log(
            "Write (sendAudio b64): ",
            message.from,
            ">",
            result.to.remote._serialized,
            ":",
            reply.audio.filename
          )
        )
        .catch((err) => console.error("Error (sendAudio b64): ", err));
    } else {
      await client
        .sendVoice(message.from, message.audio)
        .then((result) =>
          console.log(
            "Write (sendAudio): ",
            message.from,
            ">",
            result.to.remote._serialized,
            ":",
            reply.audio
          )
        )
        .catch((err) => console.error("Error (sendAudio): ", err));
    }
  }
}

/**
 *
 * @param {Object} client
 * @param {Object} message
 * @param {Object} reply
 */
async function watchSendText(client, message, reply) {
  if (
    !reply.hasOwnProperty("link") &&
    !reply.hasOwnProperty("buttons") &&
    !reply.hasOwnProperty("description") &&
    reply.hasOwnProperty("message")
  ) {
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
}
