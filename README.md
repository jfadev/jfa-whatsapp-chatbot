![Jfa Whatsapp Chatbot](doc/whatsapp-chatbot.jpg?raw=true "Jfa Whatsapp Chatbot")

# Jfa Whatsapp Chatbot 💬 

>**Attention:** This version is **NOT STABLE** yet!!! **NOT USE YET**!!!

With this [node.js](https://nodejs.org/) micro framework using [Venom Bot](https://github.com/orkestral/venom) under the hood, 
you can easily create a WhatsApp Chatbot 🤖 . 
You will only need to edit your conversation flow in a single file.

Homepage: [https://jordifernandes.com/jfa-whastapp-chatbot/](https://jordifernandes.com/jfa-whastapp-chatbot/)

- [Jfa Whatsapp Chatbot 💬](#jfa-whatsapp-chatbot-)
  - [Getting Started](#getting-started)
  - [Install](#install)
  - [Configuration](#configuration)
  - [Run](#run)
  - [Sessions](#sessions)
  - [Logs](#logs)
  - [Conversation Flow](#conversation-flow)
    - [Replies Types](#replies-types)
      - [Send Text](#send-text)
      - [Send Buttons](#send-buttons)
      - [Send List](#send-list)
      - [Send Link](#send-link)
      - [Send Image](#send-image)
      - [Send Audio](#send-audio)
      - [Forward Message](#forward-message)
    - [Helpers](#helpers)
    - [Hooks](#hooks)
  - [Examples](#examples)
    - [Example 1](#example-1)
    - [Example 2](#example-2)
    - [Example 3](#example-3)
    - [Example 4](#example-4)
    - [Example 5](#example-5)
    - [Example 6](#example-6)
    - [Example 7](#example-7)
    - [Example 8](#example-8)
    - [Example 9](#example-9)
    - [More Examples](#more-examples)
  - [Troubleshooting](#troubleshooting)
  - [Donate](#donate)
  - [License](#license)
  - [Contributing](#contributing)
  - [Contributors](#contributors)

## Getting Started

Create a new repository from [this template](https://github.com/jfadev/jfa-whatsapp-chatbot/generate).

## Install

Requirements: [nodejs](https://nodejs.org/), [yarn](https://yarnpkg.com/), [pm2](https://www.npmjs.com/package/pm2), [ngrok](https://ngrok.com/)

```bash
$ yarn install
```

## Configuration

Edit `./src/config.js` file

## Run

For production:

```bash
$ yarn start
$ yarn stop
$ yarn restart
$ yarn reload
$ yarn http-ctrl:start
$ yarn http-ctrl:stop
$ yarn http-ctrl:restart
$ yarn http-ctrl:reload
```

For development:

```bash
$ yarn dev
$ yarn dev:detach
$ yarn http-ctrl:dev
$ yarn http-ctrl:dev:detach
$ yarn ngrok:start
```

## Sessions

Sessions and auth tokens are write in Folder `./tokens`

## Logs

Logs are write in `./logs` folder.

```bash
$ yarn log:console
$ yarn log:conversations
$ yarn log:ngrok
```

## Conversation Flow

The conversation flow is an array of ordered reply objects. 
A reply is only triggered if its `parent` (can be an integer or an array) 
is equal to the `id` of the previous reply. 

![Replies Relations](doc/replies-relations.jpg?raw=true "Replies Relations")

To indicate that a reply is the end of the conversation add the following property:

| Property | Type    | Description                  |
|----------|---------|------------------------------|
| `end`    | Boolean | The end of the conversation  |

A reply necessarily needs the following properties:

### Replies Types

#### Send Text

| Property | Type    | Description                                                                            |
|----------|---------|----------------------------------------------------------------------------------------|
| `id`     | Integer | Reply `id` is used to link with `parent`                                               |
| `parent` | Integer | Id of the reply parent or ids array `[2, 3]`. If it has no parent it is `0` by default |
| `pattern`| RegExp  | Regular expression to match in lower case                                              |
| `message`| String  | Reply text message                                                                     |

Example

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

| Property     | Type    | Description                                                                        |
|--------------|---------|------------------------------------------------------------------------------------|
| `id`         | Integer | Reply `id` is used to link with `parent`                                           |
| `parent` | Integer | Id of the reply parent or ids array `[2, 3]`. If it has no parent it is `0` by default |
| `pattern`    | RegExp  | Regular expression to match in lower case                                          |
| `message`    | String  | Reply text message                                                                 |
| `description`| String  | Reply text subtitle                                                                |
| `buttons`    | Array   | Button object, look at the example                                                 |

Example

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

#### Send List

| Property     | Type    | Description                                                                            |
|--------------|---------|----------------------------------------------------------------------------------------|
| `id`         | Integer | Reply `id` is used to link with `parent`                                               |
| `parent`     | Integer | Id of the reply parent or ids array `[2, 3]`. If it has no parent it is `0` by default |
| `pattern`    | RegExp  | Regular expression to match in lower case                                              |
| `message`    | String  | Reply text message                                                                     |
| `description`| String  | Reply text subtitle                                                                    |
| `button`     | String  | List button text                                                                       |
| `list`       | Array   | List object, look at the example                                                       |

Example

```javascript
[
  {
    id: 1,
    parent: 0,
    pattern: /other country/,
    message: "Choice one country",
    description: "Choice one option!",
    button: "Countries list",
    list: list([
      "Argentina",
      "Belize",
      "Bolivia",
    ]),
  },
]
```

#### Send Link

| Property | Type    | Description                                                                            |
|----------|---------|----------------------------------------------------------------------------------------|
| `id`     | Integer | Reply `id` is used to link with `parent`                                               |
| `parent` | Integer | Id of the reply parent or ids array `[2, 3]`. If it has no parent it is `0` by default |
| `pattern`| RegExp  | Regular expression to match in lower case                                              |
| `message`| String  | Reply text message                                                                     |
| `link`   | String  | URL of generated link preview                                                          |

Example

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

| Property | Type    | Description                                                                            |
|----------|---------|----------------------------------------------------------------------------------------|
| `id`     | Integer | Reply `id` is used to link with `parent`                                               |
| `parent` | Integer | Id of the reply parent or ids array `[2, 3]`. If it has no parent it is `0` by default |
| `pattern`| RegExp  | Regular expression to match in lower case                                              |
| `image`  | Path / Object  | Path or Object returned by `remoteImg()` funtion                                |

Example

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

| Property | Type    | Description                                                                            |
|----------|---------|----------------------------------------------------------------------------------------|
| `id`     | Integer | Reply `id` is used to link with `parent`                                               |
| `parent` | Integer | Id of the reply parent or ids array `[2, 3]`. If it has no parent it is `0` by default |
| `pattern`| RegExp  | Regular expression to match in lower case                                              |
| `audio`  | Path / Object  | Path or Object returned by `remoteAudio()` funtion.                             |

Example

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

#### Forward Message

| Property | Type    | Description                                                                            |
|----------|---------|----------------------------------------------------------------------------------------|
| `id`     | Integer | Reply `id` is used to link with `parent`                                               |
| `parent` | Integer | Id of the reply parent or ids array `[2, 3]`. If it has no parent it is `0` by default |
| `pattern`| RegExp  | Regular expression to match in lower case                                              |
| `message`| String  | Reply text message                                                                     |
| `forward`| String  | Number where the message is forwarded                                                  |

Example

```javascript
[
    {
    id: 1,
    parent: 0,
    pattern: /forward/,
    message: "Text to forward",
    forward: "55368275082750726@c.us", // forward this message to this number
  }
]
```

### Helpers

| Helper                 | Return | Description                                                                       |
|------------------------|--------|-----------------------------------------------------------------------------------|
| `buttons(buttonTexts)` | Array  | Generate buttons                                                                  |
| `remoteTxt(url)`       | String | Return a remote TXT file                                                          |
| `remoteJson(url)`      | JSON   | Return a remote JSON file                                                         |
| `remoteImg(url)`       | Object | Return a remote Image file                                                        |
| `remoteAudio(url)`     | Object | Return a remote Audio file                                                        |
| `list(listRows)`       | Array  | Generate list                                                                     |
| `inp(id, parents)`     | String | Return input string by reply id. Use in beforeReply, afterReply and beforeForward |

### Hooks

| Property                                              | Type     | Description                            |
|-------------------------------------------------------|----------|----------------------------------------|
| `beforeReply(from, input, output, parents, media)`    | Function | Inject custom code before a reply      |
| `afterReply(from, input, parents, media)`             | Function | Inject custom code after a reply       |
| `beforeForward(from, forward, input, parents, media)` | Function | Inject custom code before a forward    |

## Examples

Edit your file `./src/conversations/conversation.js` and create your custom conversation workflow.

### Example 1

[doc/examples/conversation1.js](doc/examples/conversation1.js)

```javascript
import { buttons } from "../helpers.js";

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
    end: true,
  },
  {
    id: 3,
    parent: 1, // Relation with id: 1
    pattern: /linkedin/,
    message: "Visit my LinkedIn profile!",
    link: "https://www.linkedin.com/in/jfadev",
    end: true,
  },
  {
    id: 4,
    parent: 1, // Relation with id: 1
    pattern: /github/,
    message: "Check my Github repositories!",
    link: "https://github.com/jfadev",
    end: true,
  },
  {
    id: 5,
    parent: 1, // Relation with id: 1
    pattern: /donate/,
    message: "A tip is always good!",
    link: "https://jordifernandes.com/donate/",
    end: true,
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
    end: true,
  },
];
```

### Example 2

[doc/examples/conversation2.js](doc/examples/conversation2.js)

```javascript
import { buttons, remoteTxt, remoteJson } from "../helpers.js";

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
    end: true,
  },
  {
    id: 3,
    parent: 1, // Relation with id: 1
    pattern: /order/,
    message: "Make a order!",
    link: `${customEndpoint}/delivery-order.php`,
    end: true,
  },
  {
    id: 4,
    parent: 1, // Relation with id: 1
    pattern: /human/,
    message: "Please call the following whatsapp number: +1 206 555 0100",
    end: true,
  },
];
```

### Example 3

[doc/examples/conversation3.js](doc/examples/conversation3.js)

```javascript
import fetch from "sync-fetch";
import { remoteImg } from "../helpers.js";

const customEndpoint = "https://jordifernandes.com/examples/chatbot";

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
    message: "You are choice item number $input. How many units do you want?", // Inject input value ($input) in message
  },  
  {
    id: 4,
    parent: 2, // Relation with id: 2
    pattern: /\d+/, // Match any number
    message: "You are choice $input units. How many units do you want?",
    // Inject custom code or overwrite output 'message' property before reply
    beforeReply(from, input, output, parents) {
      // Example check external api and overwrite output 'message'
      const response = fetch(
        `${customEndpoint}/delivery-check-stock.php/?item=${input}&qty=${parents.pop()}`
      ).json();
      return response.stock === 0
        ? "Item number $input is not available in this moment!"
        : output;
    },
    end: true,
  },
];
```

### Example 4

[doc/examples/conversation4.js](doc/examples/conversation4.js)

```javascript
import { remoteImg } from "../helpers.js";

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
    end: true,
  },
  {
    id: 3,
    parent: 1,
    pattern: /remote/, 
    image: remoteImg(`${customEndpoint}/image1.jpg`),
    end: true,
  },
];
```

### Example 5

[doc/examples/conversation5.js](doc/examples/conversation5.js)

```javascript
import { remoteImg } from "../helpers.js";

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
    end: true,
  },
  {
    id: 3,
    parent: 1,
    pattern: /remote/, 
    audio: remoteAudio(`${customEndpoint}/audio1.mp3`),
    end: true,
  },
];
```

### Example 6

[doc/examples/conversation6.js](doc/examples/conversation6.js)

```javascript
import fetch from "sync-fetch";

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
    beforeReply(from, input, output, parents) {
      // Get reply from external api and overwrite output 'message'
      const response = fetch(`${customEndpoint}/ai-reply.php/?input=${input}`).json();
      return response.message;
    },
    end: true,
  },
];
```

### Example 7

[doc/examples/conversation7.js](doc/examples/conversation7.js)

```javascript
import fetch from "sync-fetch";

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
    afterReply(from, input, parents) {
      // Send whatsapp number to external api
      const response = fetch(`${customEndpoint}/number-lead.php/`, {
        method: "POST",
        body: JSON.stringify({ number: from }),
        headers: { "Content-Type": "application/json" },
      }).json();
      console.log('response:', response);
    },
    end: true,
  },
];
```

### Example 8

[doc/examples/conversation8.js](doc/examples/conversation8.js)

```javascript
import { buttons, inp } from "../helpers.js";

/**
 * Chatbot conversation flow
 * Example 8
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /.*/,
    message: "Choice one option",
    description: "choice option:",
    buttons: buttons(["Option 1", "Option 2"]),
  },
  {
    id: 2,
    parent: 1,
    pattern: /.*/,
    message: "We have received your request. Thanks.\n\n",
    beforeReply(from, input, output, parents) {
      output += `Your option: ${inp(2, parents)}`;
      return output;
    },
    forward: "5512736862295@c.us", // default number or empty
    beforeForward(from, forward, input, parents) { // Overwrite forward number
      switch (inp(2, parents)) { // Access to replies inputs by id
        case "option 1":
          forward = "5511994751001@c.us";
          break;
        case "option 2":
          forward = "5584384738389@c.us";
          break;
        default:
          forward = "5512736862295@c.us";
          break;
      }
      return forward;
    },
    end: true,
  },
];
```

### Example 9

[doc/examples/conversation9.js](doc/examples/conversation9.js)

```javascript
/**
 * Chatbot conversation flow
 * Example 9
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /.*/, // Match all
    message: "",
    // Inject custom code or overwrite output 'message' property before reply
    beforeReply(from, input, output, parents, media) {
      if (media) {
        console.log("media buffer", media.buffer);
        return `You send file with .${media.extension} extension!`;
      } else {
        return "Send a picture please!";
      }
    },
    end: true,
  },
];
```

### More Examples

[https://jordifernandes.com/jfa-whastapp-chatbot/](https://jordifernandes.com/jfa-whastapp-chatbot/)

## Troubleshooting

>**Attention:** Do not log in to whatsapp web with the same account that the chatbot uses. This will make the chatbot unable to hear the messages.

>**Attention:** You need a whatsapp account for the chatbot and a different account to be able to talk to it.

>**Attention:** Does not work with WhatsApp multi-device (beta). Disable it on your device.

## Donate

[https://jordifernandes.com/donate/](https://jordifernandes.com/donate/)

## License

[MIT License](LICENSE)

## Contributing

Pull requests are welcome :)

## Contributors

- [Jordi Fernandes (@jfadev)](https://github.com/jfadev)