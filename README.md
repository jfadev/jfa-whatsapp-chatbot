![Jfa Whatsapp Chatbot](whatsapp-chatbot.jpg?raw=true "Jfa Whatsapp Chatbot")

# Jfa Whatsapp Chatbot 💬 

With this [node.js](https://nodejs.org/) starter using [Venom Bot](https://github.com/orkestral/venom) under the hood, 
you can easily create a WhatsApp Chatbot 🤖 . 
You will only need to edit your conversation flow in a single file.

Homepage: [https://jordifernandes.com/jfa-whastapp-chatbot/](https://jordifernandes.com/jfa-whastapp-chatbot/)

- [Init](#init)
- [Install](#install)
- [Run](#run)
- [Log](#log)
- [Conversation Flow](#conversation-flow)
  - [Replies Types](#replies-types)
    - [Send Text](#send-text)
    - [Send Buttons](#send-buttons)
    - [Send Link](#send-lin)
    - [Send Image](#send-image)
  - [Functions](#functions)
  - [Hooks](#hooks)
- [Examples](#examples)
  - [Example 1](#example-1)
  - [Example 2](#example-2)
  - [Example 3](#example-3)

- [More Examples](#more-examples)
- [Donate](#donate)
- [License](#license)
- [Contributors](#contributors)

## Init

Create a new repository from [this template](https://github.com/jfadev/jfa-whatsapp-chatbot/generate).

## Install

```bash
$ yarn install
```

## Run

For production:

```bash
$ yarn start
```

For development:

```bash
$ yarn dev
```

## Log

Log is write in `./chatbot.log` file.

```bash
$ yarn log
```

## Conversation Flow

The conversation flow is an array of ordered reply objects. 
A reply is only triggered if its `parent` is equal to the `id` of the previous reply. 
A reply necessarily needs the following properties:

### Replies Types

#### Send Text

| Property | Type    | Description                                                      |
|----------|---------|------------------------------------------------------------------|
| `id`     | Integer | Reply `id` is used to link with `parent`                         |
| `parent` | Integer | Id of the reply parent, if it has no parent it is `0` by default |
| `pattern`| RegExp  | Regular expression to match in lower case                        |
| `message`| String  | Reply text message                                               |

#### Send Buttons

| Property     | Type    | Description                                                      |
|--------------|---------|------------------------------------------------------------------|
| `id`         | Integer | Reply `id` is used to link with `parent`                         |
| `parent`     | Integer | Id of the reply parent, if it has no parent it is `0` by default |
| `pattern`    | RegExp  | Regular expression to match in lower case                        |
| `message`    | String  | Reply text message                                               |
| `description`| String  | Reply text subtitle                                              |
| `buttons`    | Array   | Button object, look at the example                               |

#### Send Link

| Property | Type    | Description                                                      |
|----------|---------|------------------------------------------------------------------|
| `id`     | Integer | Reply `id` is used to link with `parent`                         |
| `parent` | Integer | Id of the reply parent, if it has no parent it is `0` by default |
| `pattern`| RegExp  | Regular expression to match in lower case                        |
| `message`| String  | Reply text message                                               |
| `link`   | String  | URL of generated link preview                                    |

#### Send Image

| Property | Type    | Description                                                      |
|----------|---------|------------------------------------------------------------------|
| `id`     | Integer | Reply `id` is used to link with `parent`                         |
| `parent` | Integer | Id of the reply parent, if it has no parent it is `0` by default |
| `pattern`| RegExp  | Regular expression to match in lower case                        |
| `message`| String  | Reply text message                                               |
| `image`  | Base64  | Base64 of image use `remoteImg()` funtion.                       |

### Functions

| Function                            | Return | Description                            |
|-------------------------------------|--------|----------------------------------------|
| `buttons(buttonTexts)`              | Array  | Generate buttons                       |
| `remoteTxt(url, cacheDelay = null)` | String | Return a remote TXT file               |
| `remoteJson(url, cacheDelay = null)`| JSON   | Return a remote JSON file              |
| `remoteImg(url, cacheDelay = null)` | Base64 | Return  a remote Image file            |

### Hooks

| Property                           | Type     | Description                           |
|------------------------------------|----------|---------------------------------------|
| `beforeReply(from, input, output)` | Function | Inject custom code before a reply     |
| `afterReply(from, input)`          | Function | Inject custom code after a reply      |

## Examples

Edit your file `./src/conversation.js` and create your custom conversation workflow.

### Example 1

```javascript
import { buttons } from "./functions.js";

/**
 * Chatbot conversation flow
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /hello|hi|howdy|welcome|good day|good morning|hey|hi-ya|how are you|how goes it|howdy\-do/,
    message: "Hello! Thank you for contacting me, I am a Chatbot 🤖 , we will gladly assist you.",
    description: "Can I help with something?",
    buttons: buttons([
      "Website",
      "Linkedin",
      "Github",
      "Donate",
      "Leave a Message",
    ]),
  },
  {
    id: 2,
    parent: 1, // Relation with id: 1
    pattern: /website/,
    message: "Visit my website and learn more about me!",
    link: "https://jordifernandes.com/",
  },
  {
    id: 3,
    parent: 1, // Relation with id: 1
    pattern: /linkedin/,
    message: "Visit my LinkedIn profile!",
    link: "https://www.linkedin.com/in/jfadev",
  },
  {
    id: 4,
    parent: 1, // Relation with id: 1
    pattern: /github/,
    message: "Check my Github repositories!",
    link: "https://github.com/jfadev",
  },
  {
    id: 5,
    parent: 1, // Relation with id: 1
    pattern: /donate/,
    message: "A tip is always good!",
    link: "https://jordifernandes.com/donate/",
  },
  {
    id: 6,
    parent: 1, // Relation with id: 1
    pattern: /leave a message/,
    message: "Write your message, I will contact you as soon as possible!",
  },
  {
    id: 7,
    parent: 6, // Relation with id: 6
    pattern: /.*/, // Match with all text
    message: "Thank you very much, your message will be sent to Jordi! Sincerely the Chatbot 🤖 !",
  },
];
```

### Example 2

```javascript
import { buttons, remoteTxt, remoteJson } from "./functions.js";

const customEndpoint = "https://jordifernandes.com/examples/chatbot";

/**
 * Chatbot conversation flow
 * Example 2
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /.*/,
    message: "Hello! I am a Delivery Chatbot.",
    description: "Choice one option!",
    buttons: buttons([
      "See today's menu?",
      "Order directly!",
      "Talk to a human!",
    ]),
  },
  {
    id: 2,
    parent: 1, // Relation with id: 1
    pattern: /menu/,
    message: remoteTxt(`${customEndpoint}/menu.txt`),
    // message: remoteJson(`${customEndpoint}/menu.json`)[0].message,
  },
  {
    id: 3,
    parent: 1, // Relation with id: 1
    pattern: /order/,
    message: "Make a order!",
    link: `${customEndpoint}/delivery-order.php`,
  },
  {
    id: 4,
    parent: 1, // Relation with id: 1
    pattern: /human/,
    message: "Please call the following whatsapp number: +1 206 555 0100",
  },
];
```

### Example 3

```javascript
import { remoteImg } from "./functions.js";

const customEndpoint = "https://jordifernandes.com/examples/chatbot";

/**
 * Chatbot conversation flow
 * Example 3
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /.*/,
    message: "Hello! I am a Delivery Chatbot. Send a menu item number!",
    image: remoteImg(`${customEndpoint}/menu.jpg`),
  },
  {
    id: 2,
    parent: 1, // Relation with id: 1
    pattern: /\d+/,
    message: "You are choise item number $input. How many units do you want?",
    // Inject custom code or overwrite 'message' property before repy
    beforeReply(from, input, output) {
      const response = await fetch(
        `${customEndpoint}/delivery-check-items.php/?item=${input}`
      ).then((res) => res.json());
      return response.stock === 0
        ? "Item number $input is not avilable in this moment!"
        : output;
    },
  },
  {
    id: 3,
    parent: 2, // Relation with id: 2
    pattern: /\d+/,
    message: "You are choise $input units. How many units do you want?",
    // Inject custom code after reply
    afterReply(from, input) {
      // saveRemote(`${customEndpoint}/delivery-order.php`, {
      //   date: Date.now(),
      //   from: from,
      //   units: input,
      // });
      // saveLocal("./orders.json", {
      //   date: Date.now(),
      //   from: from,
      //   units: input,
      // });
    },
  },
];
```

### More Examples

[https://jordifernandes.com/jfa-whastapp-chatbot/](https://jordifernandes.com/jfa-whastapp-chatbot/)

## Donate

[https://jordifernandes.com/donate/](https://jordifernandes.com/donate/)

## License

[MIT License](LICENSE)

## Contributors

- [Jordi Fernandes (@jfadev)](https://github.com/jfadev)