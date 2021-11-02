#!/usr/bin/env node

const venom = require("venom-bot");

venom
  .create(
    //session
    "botSession", //Pass the name of the client you want to start the bot
    //catchQR
    (base64Qrimg, asciiQR, attempts, urlCode) => {
      // console.log('Number of attempts to read the qrcode: ', attempts);
      // console.log('Terminal qrcode: ', asciiQR);
      // console.log('base64 image string qrcode: ', base64Qrimg);
      // console.log('urlCode (data-ref): ', urlCode);
    },
    // statusFind
    (statusSession, session) => {
      console.log("Status Session: ", statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
      //Create session wss return "serverClose" case server for close
      console.log("Session name: ", session);
    },
    // options
    {
      folderNameToken: "tokens", //folder name when saving tokens
      mkdirFolderToken: "", //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
      headless: true, // Headless chrome
      devtools: false, // Open devtools by default
      useChrome: true, // If false will use Chromium instance
      debug: false, // Opens a debug session
      logQR: true, // Logs QR automatically in terminal
      browserWS: "", // If u want to use browserWSEndpoint
      browserArgs: ["'--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36'"], //Original parameters  ---Parameters to be added into the chrome browser instance
      puppeteerOptions: {}, // Will be passed to puppeteer.launch
      disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
      disableWelcome: true, // Will disable the welcoming message which appears in the beginning
      updatesLog: true, // Logs info updates automatically in terminal
      autoClose: 60000, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
      createPathFileToken: true, //creates a folder when inserting an object in the client's browser, to work it is necessary to pass the parameters in the function create browserSessionToken
    }
  )
  .then((client) => {
    console.log("start");
    start(client);
  })
  .catch((err) => {
    console.log(err);
  });

function start(client) {
  // welcome(client, "oi", null);
  // watch(client, "1", "Voce escolheu a opção Bem!", null);

  welcome(client, "oi", () => {
    watch(client, "1", "Voce escolheu a opção Bem!", () => {
      watch(client, "2", "Ok!", () => {
        // Send Messages with Buttons Reply
        const buttons = [
          {
            buttonText: {
              displayText: "Text of Button 1",
            },
          },
          {
            buttonText: {
              displayText: "Text of Button 2",
            },
          },
        ];
        client
          .sendButtons(message.from, "Title", buttons, "Description")
          .then((result) => {
            console.log("Result: ", result); //return object success
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
          });
      });
    });
  });
}

function watch(client, pattern, reply, callback) {
  console.log("init watch");
  client.onAnyMessage((message) => {
    console.log("onAnyMessage");
    let body = message.body.toLowerCase();
    pattern = pattern.toLowerCase();
    if (body.includes(pattern) && message.isGroupMsg === false) {
      console.log("if", pattern, body);
      client
        .sendText(message.from, reply)
        .then((result) => {
          console.log("Result: ", result);
          callback();
        })
        .catch((err) => {
          console.error("Error when sending: ", err);
        });
    }
  });
}

function welcome(client, pattern, callback) {
  console.log("Init welcome");
  client.onAnyMessage((message) => {
    console.log("onAnyMessage");
    let body = message.body.toLowerCase();
    pattern = pattern.toLowerCase();
    if (body.includes(pattern) && message.isGroupMsg === false) {
      console.log("if", pattern, body);
      console.log("Welcome to chatbot");
      // Send List menu
      //This function does not work for Bussines contacts
      const list = [
        {
          title: "Pasta",
          rows: [
            {
              title: "Ravioli Lasagna",
              description: "Made with layers of frozen cheese",
            },
          ],
        },
        {
          title: "Dessert",
          rows: [
            {
              title: "Baked Ricotta Cake",
              description: "Sweets pecan baklava rolls",
            },
            {
              title: "Lemon Meringue Pie",
              description: "Pastry filled with lemonand meringue.",
            },
          ],
        },
      ];
      client
        .sendListMenu(
          message.from,
          "Title",
          "subTitle",
          "Description",
          "menu",
          list
        )
        .then((result) => {
          console.log("Result: ", result); //return object success
          callback();
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }
  });
}
