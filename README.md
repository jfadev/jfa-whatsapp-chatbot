# Jfa Whatsapp Chatbot 💬 

With this [node.js](https://nodejs.org/) starter using [Venom Bot](https://github.com/orkestral/venom) under the hood. 
you can easily create a WhatsApp Chatbot 🤖 . 
You will only need to edit your conversation flow in a single file.

Homepage: [https://jordifernandes.com/jfa-whastapp-chatbot/](https://jordifernandes.com/jfa-whastapp-chatbot/)

## Install

```bash
$ yarn install
```

## Start

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
A reply is only triggered if its parent is equal to the id of the previous reply. 
A reply necessarily needs the following properties:

### Send Simple Text

| Property | Type    | Description                                                      |
|----------|---------|------------------------------------------------------------------|
| id       | Integer | Reply `id` is used to link with `parent`                         |
| parent   | Integer | Id of the reply parent, if it has no parent it is `0` by default |
| pattern  | RegExp  | Regular expression to match in lower case                        |
| message  | String  | Reply text message                                               |

### Send Buttons

| Property    | Type    | Description                                                      |
|-------------|---------|------------------------------------------------------------------|
| id          | Integer | Reply `id` is used to link with `parent`                         |
| parent      | Integer | Id of the reply parent, if it has no parent it is `0` by default |
| pattern     | RegExp  | Regular expression to match in lower case                        |
| message     | String  | Reply text message                                               |
| description | String  | Reply text subtitle                                              |
| buttons     | Array   | Button object, look at the example                               |

### Send Link

| Property | Type    | Description                                                      |
|----------|---------|------------------------------------------------------------------|
| id       | Integer | Reply `id` is used to link with `parent`                         |
| parent   | Integer | Id of the reply parent, if it has no parent it is `0` by default |
| pattern  | RegExp  | Regular expression to match in lower case                        |
| message  | String  | Reply text message                                               |
| link     | String  | URL of generated link preview                                    |

### Example:

Edit your file `./src/conversation.js` and create your custom conversation workflow.

```javascript
export default [
  {
    id: 1,
    parent: 0,
    pattern: /hello|hi|howdy|welcome|bonjour|buenas noches|buenos dias|good day|good morning|hey|hi-ya|how are you|how goes it|howdy\-do|shalom|what\'s happening|what\'s up/,
    message: "Hello! Thank you for contacting me, I am a Chatbot 🤖 , we will gladly assist you.",
    description: "Can I help with something?",
    buttons: [
      {
        buttonText: {
          displayText: "Website",
        },
      },
      {
        buttonText: {
          displayText: "Linkedin",
        },
      },
      {
        buttonText: {
          displayText: "Github",
        },
      },
      {
        buttonText: {
          displayText: "Donate",
        },
      },
      {
        buttonText: {
          displayText: "Leave a Message",
        },
      },
    ],
  },
  {
    id: 2,
    parent: 1,
    pattern: /website/,
    message: "Visit my website and learn more about me!",
    link: "https://jordifernandes.com/",
  },
  {
    id: 3,
    parent: 1,
    pattern: /linkedin/,
    message: "Visit my LinkedIn profile!",
    link: "https://www.linkedin.com/in/jfadev",
  },
  {
    id: 4,
    parent: 1,
    pattern: /github/,
    message: "Check my Github repositories!",
    link: "https://github.com/jfadev",
  },
  {
    id: 5,
    parent: 1,
    pattern: /donate/,
    message: "a tip is always good!",
    link: "https://jordifernandes.com/donate/",
  },
  {
    id: 6,
    parent: 1,
    pattern: /leave a message/,
    message: "Write your message, I will contact you as soon as possible!",
  },
  {
    id: 7,
    parent: 6,
    pattern: /.*/,
    message: "Thank you very much, your message will be sent to Jordi! Sincerely the Chatbot 🤖 !",
  },
];
```

### More Examples:

[https://jordifernandes.com/jfa-whastapp-chatbot/](https://jordifernandes.com/jfa-whastapp-chatbot/)

## Donate

[https://jordifernandes.com/donate/](https://jordifernandes.com/donate/)

## License

[MIT License](LICENSE)

## Contributors

- [Jordi Fernandes (@jfadev)](https://github.com/jfadev)