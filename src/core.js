import venom from "venom-bot";
import { venomOptions } from "./config.js";
import express from "express";
import fs from "fs";
import http from "http";

console.log("\x1b[36m", "--- Jfa WhatsApp Chatbot (by @jfadev) ---", "\x1b[0m");

/**
 * Logging debug
 * @param {String} type
 * @param {String} message
 */
export function log(type, message) {
  let datetime = new Date().toLocaleString();
  let msg = `[${datetime}] [${type}] ${message}`;
  console.log(msg);
  fs.appendFileSync("logs/conversations.log", msg + "\n", "utf8");
}

/**
 * Logging error
 * @param {String} message
 */
export function error(message, err) {
  let datetime = new Date().toLocaleString();
  let msg = `[${datetime}] [Error] ${message}`;
  console.error(msg);
  console.error(err);
  fs.appendFileSync(
    "logs/conversations.log",
    msg + " " + err.status + "\n",
    "utf8"
  );
}

/**
 * Create a chatbot session
 * @param {String} name
 * @param {Array} conversation
 */
export async function session(name, conversation) {
  fs.writeFileSync(
    `tokens/${name}/qr.json`,
    JSON.stringify({ attempts: 0, base64Qr: "" })
  );
  fs.writeFileSync(
    `tokens/${name}/session.json`,
    JSON.stringify({ session: "", status: "starting" })
  );
  venom
    .create(
      name,
      (base64Qr, asciiQR, attempts, urlCode) => {
        fs.writeFileSync(
          `tokens/${name}/qr.json`,
          JSON.stringify({ attempts, base64Qr })
        );
      },
      (statusSession, session) => {
        fs.writeFileSync(
          `tokens/${name}/session.json`,
          JSON.stringify({ session, status: statusSession })
        );
      },
      venomOptions
    )
    .then((client) => start(client, conversation))
    .catch((err) => console.error(err));
}

/**
 * Create a chatbot http Qr login
 * @param {String} name
 * @param {Number} port
 */
export async function httpCtrl(name, port = 3000) {
  const app = express();
  const httpServer = http.createServer(app);
  httpServer.listen(port, () => {
    console.log(
      `\x1b[32minfo\x1b[39m:     [${name}] Http chatbot control running on http://localhost:${port}/`
    );
  });
  app.get("/", (req, res, next) => {
    let qr = JSON.parse(fs.readFileSync(`tokens/${name}/qr.json`));
    let sess = JSON.parse(fs.readFileSync(`tokens/${name}/session.json`));
    res.send(`
      <html><head></head><body>
      <h1>Chatbot Login</h1>
      <p>Session: <b>${sess.session}</b></p>
      <p>Status: <b>${sess.status}</b></p>
      <h3>Scan QR code</h3>
      <p>${qr.attempts} attempts!</p>
      <img id="qr" src="${qr.base64Qr}"></body>
      <script>
        setInterval(() => {
          location.reload();
        }, 4000);
      </script>
      <p><a href="/logs" target="_blank">View conversations logs</a></p>
      </body></html>`);
  });
  app.get("/logs", (req, res, next) => {
    let sess = JSON.parse(fs.readFileSync(`tokens/${name}/session.json`));
    let logs = fs
      .readFileSync("logs/conversations.log")
      .toString()
      .replace(/\n/g, "<br>");
    res.send(`
      <html><head></head><body>
      <h1>Chatbot Logs</h1>
      <p>Session: <b>${sess.session}</b></p>
      <p>Status: <b>${sess.status}</b></p>
      <h3>Conversation Logs</h3>
      <p>${logs}</p>
      <script>
        setInterval(() => {
          location.reload();
        }, 4000);
      </script>
      </body></html>`);
  });
}

/**
 * Start run listener of whatsapp messages
 * @param {Object} client
 * @param {Array} conversation
 */
export async function start(client, conversation) {
  log("Start", `Conversation flow (${conversation.length} replies) running...`);
  try {
    let sessions = [];
    client.onMessage(async (message) => {
      if (!sessions.find((o) => o.from === message.from)) {
        sessions.push({ from: message.from, parent: 0, parents: [] });
      }
      const parent = sessions.find((o) => o.from === message.from).parent;
      const parents = sessions.find((o) => o.from === message.from).parents;
      const input = message.body ? message.body.toLowerCase() : message.body;
      let replies = conversation.filter(
        (o) =>
          (Array.isArray(o.parent) && o.parent.includes(parent)) ||
          o.parent === parent
      );
      for (const reply of replies) {
        if (reply && message.isGroupMsg === false) {
          if (reply.pattern.test(input)) {
            client.startTyping(message.from);
            log(
              "Receive",
              `from: ${message.from}, id: ${reply.id}, parent: ${reply.parent}, pattern: ${reply.pattern}, input: ${input}`
            );
            sessions
              .find((o) => o.from === message.from)
              .parents.push({ id: reply.id, input: input });
            if (reply.hasOwnProperty("beforeReply")) {
              reply.message = reply.beforeReply(
                message.from,
                input,
                reply.message,
                parents
              );
            }
            if (reply.hasOwnProperty("beforeForward")) {
              reply.forward = reply.beforeForward(
                message.from,
                reply.forward,
                input,
                parents
              );
            }
            if (reply.hasOwnProperty("message")) {
              reply.message = reply.message.replace(/\$input/g, input);
            }
            await watchSendLinkPreview(client, message, reply);
            await watchSendButtons(client, message, reply);
            await watchSendImage(client, message, reply);
            await watchSendAudio(client, message, reply);
            await watchSendText(client, message, reply);
            await watchSendList(client, message, reply);
            await watchForward(client, message, reply);
            if (reply.hasOwnProperty("afterReply")) {
              reply.afterReply(message.from, input, parents);
            }
            if (reply.hasOwnProperty("end")) {
              if (reply.end) {
                sessions.find((o) => o.from === message.from).parent = 0;
                sessions.find((o) => o.from === message.from).parents = [];
              }
            } else {
              sessions.find((o) => o.from === message.from).parent = reply.id;
              // sessions
              //   .find((o) => o.from === message.from)
              //   .parents.push({ id: reply.id, input: input });
            }
            client.stopTyping(message.from);
          }
        }
      }
    });
  } catch (err) {
    client.close();
    error(err);
  }
}

/**
 * Send link preview
 * @param {Object} client
 * @param {Object} message
 * @param {Object} reply
 */
async function watchSendLinkPreview(client, message, reply) {
  if (reply.hasOwnProperty("link") && reply.hasOwnProperty("message")) {
    await client
      .sendLinkPreview(message.from, reply.link, reply.message)
      .then((result) =>
        log("Send", `(sendLinkPreview): ${reply.message.substring(0, 40)}...`)
      )
      .catch((err) => error(`(sendLinkPreview): ${err}`));
  }
}

/**
 * Send buttons
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
        log("Send", `(sendButtons): ${reply.message.substring(0, 40)}...`)
      )
      .catch((err) => error("(sendButtons):", err));
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
          reply.image.base64,
          reply.image.filename
        )
        .then((result) =>
          log("Send", `(sendImage b64): ${reply.image.filename}`)
        )
        .catch((err) => error("(sendImage b64):", err));
    } else {
      const filename = reply.image.split("/").pop();
      await client
        .sendImage(message.from, reply.image, filename, "")
        .then((result) => log("Send", `(sendImage): ${reply.image}`))
        .catch((err) => error("(sendImage):", err));
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
      reply.audio.hasOwnProperty("base64") &&
      reply.audio.hasOwnProperty("filename")
    ) {
      await client
        .sendVoiceBase64(message.from, reply.audio.base64)
        .then((result) =>
          log("Send", `(sendAudio b64): ${reply.audio.filename}`)
        )
        .catch((err) => error("(sendAudio b64):", err));
    } else {
      await client
        .sendVoice(message.from, reply.audio)
        .then((result) => log("Send", `(sendAudio): ${reply.audio}`))
        .catch((err) => error("(sendAudio):", err));
    }
  }
}

/**
 * Send simple text
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
        log("Send", `(sendText): ${reply.message.substring(0, 40)}...`)
      )
      .catch((err) => error("(sendText):", err));
  }
}

/**
 * Send menu list
 * @param {Object} client
 * @param {Object} message
 * @param {Object} reply
 */
async function watchSendList(client, message, reply) {
  if (
    reply.hasOwnProperty("list") &&
    reply.hasOwnProperty("description") &&
    reply.hasOwnProperty("message")
  ) {
    await client
      .sendListMenu(
        message.from,
        reply.message,
        " ",
        reply.description,
        reply.button,
        reply.list
      )
      .then((result) =>
        log("Send", `(sendList): ${reply.message.substring(0, 40)}...`)
      )
      .catch((err) => error("(sendList):", err));
  }
}

/**
 * Forward message
 * @param {Object} client
 * @param {Object} message
 * @param {Object} reply
 */
async function watchForward(client, message, reply) {
  if (reply.hasOwnProperty("forward") && reply.hasOwnProperty("message")) {
    // await client
    //   .forwardMessages(reply.forward, [message.id.toString()], true)
    //   .then((result) =>
    //     log("Send", `(forward): ${reply.message.substring(0, 40)}...`)
    //   )
    //   .catch((err) => error("(forward):", err));
    await client
      .sendText(reply.forward, reply.message)
      .then((result) =>
        log("Send", `(forward): ${reply.message.substring(0, 40)}...`)
      )
      .catch((err) => error("(forward):", err));
  }
}
