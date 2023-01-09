import venom from "venom-bot";
import { chatbotOptions, venomOptions } from "./config";
import express from "express";
import fs from "fs";
import http from "http";
import { exec } from "child_process";
import mime from "mime-types";

console.log("\x1b[36m", "--- Jfa WhatsApp Chatbot (by @jfadev) ---", "\x1b[0m");

/**
 * Logging debug
 * @param {String} type
 * @param {String} message
 */
export function log(type, message) {
  const datetime = new Date().toLocaleString();
  const msg = `[${datetime}] [${type}] ${message.replace(/\n/g, " ")}`;
  console.log(msg);
  if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs", { recursive: true });
    fs.writeFileSync("logs/conversations.log", "");
  }
  fs.appendFileSync("logs/conversations.log", msg + "\n", "utf8");
}

/**
 * Logging error
 * @param {String} message
 */
export function error(message, err) {
  const datetime = new Date().toLocaleString();
  const msg = `[${datetime}] [Error] ${message.replace(/\n/g, " ")}`;
  console.error(msg);
  console.error(err);
  if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs", { recursive: true });
    fs.writeFileSync("logs/conversations.log", "");
  }
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
  log("Init", "Starting chatbot...");
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(`tokens/${name}`)) {
      fs.mkdirSync(`tokens/${name}`, { recursive: true });
    }
    fs.writeFileSync(
      `tokens/${name}/qr.json`,
      JSON.stringify({ attempts: 0, base64Qr: "" })
    );
    fs.writeFileSync(
      `tokens/${name}/session.json`,
      JSON.stringify({ session: name, status: "starting" })
    );
    fs.writeFileSync(
      `tokens/${name}/info.json`,
      JSON.stringify({
        id: "",
        formattedTitle: "",
        displayName: "",
        isBusiness: "",
        imgUrl: "",
        wWebVersion: "",
        groups: [],
      })
    );
    fs.writeFileSync(
      `tokens/${name}/connection.json`,
      JSON.stringify({ status: "DISCONNECTED" })
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
            JSON.stringify({ session: name, status: statusSession })
          );
        },
        venomOptions
      )
      .then(async (client) => {
        await start(client, conversation);
        // const hostDevice = await client.getHostDevice();
        const me = (await client.getAllContacts()).find(o => o.isMe);
        const hostDevice = {
          id: { _serialized: me.id._serialized },
          formattedTitle: me.formattedName,
          displayName: me.displayName,
          isBusiness: me.isBusiness,
          imgUrl: me.profilePicThumbObj.img,
        };
        const wWebVersion = await client.getWAVersion();
        const groups = (await client.getAllChats())
          .filter((chat) => chat.isGroup)
          .map((group) => {
            return { id: group.id._serialized, name: group.name };
          });
        setInterval(async () => {
          let status = "DISCONNECTED";
          try {
            status = await client.getConnectionState();
          } catch (error) {}
          fs.writeFileSync(
            `tokens/${name}/connection.json`,
            JSON.stringify({ status })
          );
          fs.writeFileSync(
            `tokens/${name}/info.json`,
            JSON.stringify({
              id: hostDevice.id._serialized,
              formattedTitle: hostDevice.formattedTitle,
              displayName: hostDevice.displayName,
              isBusiness: hostDevice.isBusiness,
              imgUrl: hostDevice.imgUrl,
              wWebVersion,
              groups,
            })
          );
        }, 2000);
        resolve(client);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

/**
 * Create a chatbot http Qr login
 * @param {String} name
 * @param {Number} port
 */
export async function httpCtrl(name, port = 3000) {
  if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs", { recursive: true });
    fs.writeFileSync("logs/conversations.log", "");
  }
  const app = express();
  const httpServer = http.createServer(app);
  httpServer.listen(port, () => {
    console.log(
      `\x1b[32minfo\x1b[39m:     [${name}] Http chatbot control running on http://localhost:${port}/`
    );
  });
  const authorize = (req, res) => {
    const reject = () => {
      res.setHeader("www-authenticate", "Basic");
      res.sendStatus(401);
    };
    const authorization = req.headers.authorization;
    if (!authorization) {
      return reject();
    }
    const [username, password] = Buffer.from(
      authorization.replace("Basic ", ""),
      "base64"
    )
      .toString()
      .split(":");

    if (
      !(
        username === chatbotOptions.httpCtrl.username &&
        password === chatbotOptions.httpCtrl.password
      )
    ) {
      return reject();
    }
  };
  app.get("/", (req, res, next) => {
    authorize(req, res);
    const buffer = fs.readFileSync("src/httpCtrl.html");
    let html = buffer.toString();
    res.send(html);
  });
  app.get("/data", (req, res, next) => {
    authorize(req, res);
    const infoPath = `tokens/${name}/info.json`;
    const qrPath = `tokens/${name}/qr.json`;
    const sessPath = `tokens/${name}/session.json`;
    const info = fs.existsSync(infoPath)
      ? JSON.parse(fs.readFileSync(infoPath))
      : null;
    const qr = fs.existsSync(qrPath)
      ? JSON.parse(fs.readFileSync(qrPath))
      : null;
    const sess = fs.existsSync(sessPath)
      ? JSON.parse(fs.readFileSync(sessPath))
      : null;
    const logs = fs
      .readFileSync("logs/conversations.log")
      .toString()
      .replace(/\n/g, "<br>");
    res.json({
      info,
      session: sess,
      qr: qr,
      logs: logs,
    });
  });
  app.get("/connection", async (req, res, next) => {
    authorize(req, res);
    const connectionPath = `tokens/${name}/connection.json`;
    const connection = fs.existsSync(connectionPath)
      ? JSON.parse(fs.readFileSync(connectionPath))
      : null;
    res.json({ status: connection?.status });
  });
  app.get("/controls/start", (req, res, next) => {
    authorize(req, res);
    exec("yarn start", (err, stdout, stderr) => {
      if (err) {
        res.json({ status: "ERROR" });
        console.error(err);
        return;
      }
      res.json({ status: "OK" });
      console.log(stdout);
      log("Start", `Start chatbot...`);
    });
  });
  app.get("/controls/stop", (req, res, next) => {
    authorize(req, res);
    exec("yarn stop", (err, stdout, stderr) => {
      if (err) {
        res.json({ status: "ERROR" });
        console.error(err);
        return;
      }
      res.json({ status: "OK" });
      console.log(stdout);
      log("Stop", `Stop chatbot...`);
    });
  });
  app.get("/controls/reload", (req, res, next) => {
    authorize(req, res);
    exec("yarn reload", (err, stdout, stderr) => {
      if (err) {
        res.json({ status: "ERROR" });
        console.error(err);
        return;
      }
      res.json({ status: "OK" });
      console.log(stdout);
      log("Reload", `Reload chatbot...`);
    });
  });
  app.get("/controls/restart", (req, res, next) => {
    authorize(req, res);
    exec("yarn restart", (err, stdout, stderr) => {
      if (err) {
        res.json({ status: "ERROR" });
        console.error(err);
        return;
      }
      res.json({ status: "OK" });
      console.log(stdout);
      log("Restart", `Restart chatbot...`);
    });
  });
  app.get("/controls/log/clear", (req, res, next) => {
    authorize(req, res);
    exec("> logs/conversations.log", (err, stdout, stderr) => {
      if (err) {
        res.json({ status: "ERROR" });
        console.error(err);
        return;
      }
      res.json({ status: "OK" });
      console.log(stdout);
    });
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
      // const input = message.body ? message.body.toLowerCase() : message.body;
      const media =
        message.isMedia || message.isMMS
          ? {
            buffer: client.decryptFile(message),
            extension: mime.extension(message.mimetype),
          }
          : null;
      const input =
        message.isMedia || message.isMMS
          ? `[media file ${media.extention}]`
          : message.body
            ? message.body.toLowerCase().replace("\n ", "")
            : "[undefined]";
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
              reply.message = await reply.beforeReply(
                message.from,
                input,
                reply.message,
                parents,
                media
              );
            }
            if (reply.hasOwnProperty("beforeForward")) {
              reply.forward = reply.beforeForward(
                message.from,
                reply.forward,
                input,
                parents,
                media
              );
            }
            // TODO: Verifty
            // if (reply.hasOwnProperty("message")) {
            //   reply.message = reply.message.replace(/\$input/g, input);
            // }
            await watchSendLinkPreview(client, message, reply);
            await watchSendButtons(client, message, reply);
            await watchSendImage(client, message, reply);
            await watchSendAudio(client, message, reply);
            await watchSendText(client, message, reply);
            await watchSendList(client, message, reply);
            await watchForward(client, message, reply);
            if (reply.hasOwnProperty("afterReply")) {
              reply.afterReply(message.from, input, parents, media);
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
            if (reply.hasOwnProperty("goTo")) {
              let parent = sessions.find((o) => o.from === message.from).parent;
              let id = reply.goTo(
                message.from,
                input,
                reply.message,
                parents,
                media
              );
              parent = parent ? id - 1 : null;
              if (parent) {
                sessions.find((o) => o.from === message.from).parent = parent;
              }
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
        log(
          "Send",
          `(forward): to: ${reply.forward} : ${reply.message.substring(
            0,
            40
          )}...`
        )
      )
      .catch((err) => error("(forward):", err));

    // /* Debug */
    // console.log("--- DEBUG --- forward", reply.forward);
    // await client
    //   .sendText(message.from, "--- DEBUG --- forward: " + reply.forward)
    //   .then((result) =>
    //     log("Send", `(DEBUG : forward): ${reply.message.substring(0, 40)}...`)
    //   )
    //   .catch((err) => error("(DEBUG : forward):", err));
  }
}
