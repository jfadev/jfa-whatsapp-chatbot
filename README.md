![Jfa Whatsapp Chatbot](whatsapp-chatbot.jpg?raw=true "Jfa Whatsapp Chatbot")

>**Attention:** This version is not stable yet!!!

# Jfa Whatsapp Chatbot 💬 

With this [node.js](https://nodejs.org/) starter using [Venom Bot](https://github.com/orkestral/venom) under the hood, 
you can easily create a WhatsApp Chatbot 🤖 . 
You will only need to edit your conversation flow in a single file.

Homepage: [https://jordifernandes.com/jfa-whastapp-chatbot/](https://jordifernandes.com/jfa-whastapp-chatbot/)

1. [Init](#init)
2. [Install](#install)
3. [Run](#run)
4. [Sessions](#sessions)
5. [Log](#log)
6. [Conversation Flow](#conversation-flow)
    - [Replies Types](#replies-types)
      - [Send Text](#send-text)
      - [Send Buttons](#send-buttons)
      - [Send Link](#send-lin)
      - [Send Image](#send-image)
      - [Send Audio](#send-audio)
    - [Helpers](#helpers)
    - [Hooks](#hooks)
7. [Examples](#examples)
    - [Example 1](#example-1)
    - [Example 2](#example-2)
    - [Example 3](#example-3)
    - [Example 4](#example-4)
    - [Example 5](#example-5)
    - [Example 6](#example-6)
    - [Example 7](#example-7)
    - [More Examples](#more-examples)
8. [Troubleshooting](#troubleshooting)
9. [Donate](#donate)
10. [License](#license)
11. [Contributing](#contributing)
12. [Contributors](#contributors)

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

## Sessions

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

##### Example

```javascript
[
  {
    id: 1,
    parent: 0,
    pattern: /.*/, // Match with all text
    message: "Hi I am a Chatbot!",
  }
]
```

#### Send Buttons

| Property     | Type    | Description                                                      |
|--------------|---------|------------------------------------------------------------------|
| `id`         | Integer | Reply `id` is used to link with `parent`                         |
| `parent`     | Integer | Id of the reply parent, if it has no parent it is `0` by default |
| `pattern`    | RegExp  | Regular expression to match in lower case                        |
| `message`    | String  | Reply text message                                               |
| `description`| String  | Reply text subtitle                                              |
| `buttons`    | Array   | Button object, look at the example                               |

##### Example

```javascript
[
  {
    id: 1,
    parent: 0,
    pattern: /.*/,
    message: "Hello!",
    description: "Can I help with something?",
    buttons: buttons([
      "Website",
      "Linkedin",
      "Github",
    ]),
  }
]
```

#### Send Link

| Property | Type    | Description                                                      |
|----------|---------|------------------------------------------------------------------|
| `id`     | Integer | Reply `id` is used to link with `parent`                         |
| `parent` | Integer | Id of the reply parent, if it has no parent it is `0` by default |
| `pattern`| RegExp  | Regular expression to match in lower case                        |
| `message`| String  | Reply text message                                               |
| `link`   | String  | URL of generated link preview                                    |

##### Example

```javascript
[
  {
    id: 2,
    parent: 1, // Relation with id: 1
    pattern: /github/,
    message: "Check my Github repositories!",
    link: "https://github.com/jfadev",
  }
]
```

#### Send Image

| Property | Type    | Description                                                      |
|----------|---------|------------------------------------------------------------------|
| `id`     | Integer | Reply `id` is used to link with `parent`                         |
| `parent` | Integer | Id of the reply parent, if it has no parent it is `0` by default |
| `pattern`| RegExp  | Regular expression to match in lower case                        |
| `image`  | Path / Object  | Path or Object returned by `remoteImg()` funtion.                       |

##### Example

```javascript
[
  {
    id: 1,
    parent: 0,
    pattern: /.*/, // Match all
    image: remoteImg("https://remote-server.com/menu.jpg"),
    // image: "./images/menu.jpg",
  }
]
```

#### Send Audio

| Property | Type    | Description                                                      |
|----------|---------|------------------------------------------------------------------|
| `id`     | Integer | Reply `id` is used to link with `parent`                         |
| `parent` | Integer | Id of the reply parent, if it has no parent it is `0` by default |
| `pattern`| RegExp  | Regular expression to match in lower case                        |
| `audio`  | Path / Object  | Path or Object returned by `remoteAudio()` funtion.                       |

##### Example

```javascript
[
  {
    id: 1,
    parent: 0,
    pattern: /.*/, // Match all
    audio: remoteAudio("https://remote-server.com/audio.mp3"),
    // audio: "./audios/audio.mp3",
  }
]
```

### Helpers

| Helper                            | Return | Description                            |
|-------------------------------------|--------|----------------------------------------|
| `buttons(buttonTexts)`              | Array  | Generate buttons                       |
| `remoteTxt(url, cacheDelay = null)` | String | Return a remote TXT file               |
| `remoteJson(url, cacheDelay = null)`| JSON   | Return a remote JSON file              |
| `remoteImg(url, cacheDelay = null)` | Object | Return  a remote Image file            |
| `remoteAudio(url, cacheDelay = null)` | Object | Return  a remote Audio file            |

### Hooks

| Property                           | Type     | Description                           |
|------------------------------------|----------|---------------------------------------|
| `beforeReply(from, input, output)` | Function | Inject custom code before a reply     |
| `afterReply(from, input)`          | Function | Inject custom code after a reply      |

## Examples

Edit your file `./src/conversation.js` and create your custom conversation workflow.

### Example 1

```javascript
import { buttons } from "./helpers.js";

/**
 * Chatbot conversation flow
 * Example 1
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /hello|hi|howdy|good day|good morning|hey|hi-ya|how are you|how goes it|howdy\-do/,
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
import { buttons, remoteTxt, remoteJson } from "./helpers.js";

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
import { remoteImg } from "./helpers.js";

const customEndpoint = "https://jordifernandes.com/examples/chatbot";
var inputs = [];

/**
 * Chatbot conversation flow
 * Example 3
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /.*/, // Match all
    message: "Hello! I am a Delivery Chatbot. Send a menu item number!",
  },
  {
    id: 2,
    parent: 0, // Same parent (send reply id=1 and id=2)
    pattern: /.*/, // Match all
    image: remoteImg(`${customEndpoint}/menu.jpg`),
  },
  {
    id: 3,
    parent: 1, // Relation with id: 1
    pattern: /\d+/, // Match any number
    message: "You are choise item number $input. How many units do you want?",
  },  
  {
    id: 4,
    parent: 2, // Relation with id: 2
    pattern: /\d+/, // Match any number
    message: "You are choise $input units. How many units do you want?",
    // Inject custom code or overwrite output 'message' property before reply
    beforeReply(from, input, output) {
      // Example check external api and overwrite output 'message'
      const response = await fetch(
        `${customEndpoint}/delivery-check-stock.php/?item=${input}&qty=`
      ).then((res) => res.json());
      return response.stock === 0
        ? "Item number $input is not avilable in this moment!"
        : output;
    },
  },
];
```

### Example 4

```javascript
import { remoteImg } from "./helpers.js";

const customEndpoint = "https://jordifernandes.com/examples/chatbot";

/**
 * Chatbot conversation flow
 * Example 4
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /.*/, // Match all
    message: "Image local and remote! Send [local] or [remote]",
  },
  {
    id: 2,
    parent: 1,
    pattern: /local/, 
    image: "./images/image1.jpg",
  },
  {
    id: 3,
    parent: 1,
    pattern: /remote/, 
    image: remoteImg(`${customEndpoint}/image1.jpg`),
  },
];
```

### Example 5

```javascript
import { remoteImg } from "./helpers.js";

const customEndpoint = "https://jordifernandes.com/examples/chatbot";

/**
 * Chatbot conversation flow
 * Example 5
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /.*/, // Match all
    message: "Audio local and remote! Send [local] or [remote]",
  },
  {
    id: 2,
    parent: 1,
    pattern: /local/, 
    audio: "./audios/audio1.mp3",
  },
  {
    id: 3,
    parent: 1,
    pattern: /remote/, 
    audio: remoteAudio(`${customEndpoint}/audio1.mp3`),
  },
];
```

### Example 6

```javascript
const customEndpoint = "https://jordifernandes.com/examples/chatbot";

/**
 * Chatbot conversation flow
 * Example 6
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /.*/, // Match all
    message: "",
    // Inject custom code or overwrite output 'message' property before reply
    beforeReply(from, input, output) {
      // Get reply from external api and overwrite output 'message'
      const response = await fetch(
        `${customEndpoint}/ai-reply.php/?input=${input}`
      ).then((res) => res.json());
      return response.message;
    },
  },
];
```

### Example 7

```javascript
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
    afterReply(from, input) {
      // Send whatsapp number to external api
      await fetch(`${customEndpoint}/number-lead.php/`, {
        method: "POST",
        body: JSON.stringify({ number: from }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
  },
];
```

### More Examples

[https://jordifernandes.com/jfa-whastapp-chatbot/](https://jordifernandes.com/jfa-whastapp-chatbot/)

## Troubleshooting

>**Attention:** Do not log in to whatsapp web with the same account that the chatbot uses. This will make the chatbot unable to hear the messages.

>**Attention:** You need a whatsapp account for the chatbot and a different account to be able to talk to it.

## Donate

[https://jordifernandes.com/donate/](https://jordifernandes.com/donate/)

## License

[MIT License](LICENSE)

## Contributing

Pull requests are welcome :)

## Contributors

- [Jordi Fernandes (@jfadev)](https://github.com/jfadev)