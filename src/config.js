/**
 * Chatbot options
 */
export const chatbotOptions = {
  httpCtrl: {
    port: 3000, // httpCtrl port (http://localhost:3000/)
    username: "admin",
    password: "chatbot",
  },
};

/**
 * Jobs options
 */
// export const jobsOptions = {
//   job1: {
//     rule: "*/15 * * * *",
//   },
// };

/**
 * Venom Bot options
 * @link https://github.com/orkestral/venom
 */
export const venomOptions = {
  multidevice: false,
  folderNameToken: "tokens", //folder name when saving tokens
  mkdirFolderToken: "", //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
  headless: true, // Headless chrome
  devtools: false, // Open devtools by default
  useChrome: true, // If false will use Chromium instance
  debug: false, // Opens a debug session
  logQR: true, // Logs QR automatically in terminal
  browserWS: "", // If u want to use browserWSEndpoint
  browserArgs: [
    "--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
  ], //Original parameters  ---Parameters to be added into the chrome browser instance
  puppeteerOptions: { args: ["--no-sandbox"] }, // Will be passed to puppeteer.launch. Use --no-sandbox with Docker
  disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
  disableWelcome: true, // Will disable the welcoming message which appears in the beginning
  updatesLog: true, // Logs info updates automatically in terminal
  autoClose: false, //60000, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
  createPathFileToken: true, //creates a folder when inserting an object in the client's browser, to work it is necessary to pass the parameters in the function create browserSessionToken
};
