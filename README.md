# Jfa Whatsapp Chatbot 💬 (Starter)

With this [node.js](https://nodejs.org/) starter using [Venom Bot](https://github.com/orkestral/venom) under the hood, 
you can easily create a WhatsApp Chatbot 💬. 
You will only need to edit your conversation flow in a single file.

Homepage: [https://jordifernandes.com/jfa-whastapp-chatbot/](https://jordifernandes.com/jfa-whastapp-chatbot/)

## Install

`yarn install`

## Start

`yarn start` or `yarn dev` for development

## Log

Log is write in `./chatbot.log` file.

`yarn log`

## Conversation Flow

the conversation flow is an array of ordered reply objects.
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

Edit your file `./src/conversation.js`

```javascript
export default [
  {
    id: 1,
    parent: 0,
    pattern: /oi|olá|ola|bom dia|boa tarde|boa noite/,
    message: "Bemvindo ao Chatbot da Pura Comunicação! Escreva QUERO se quer mais informação.",
  },
  {
    id: 2,
    parent: 1,
    pattern: /quero/,
    message: "Que tipo de informação esta procurando?",
    description: "Escolha",
    buttons: [
      {
        buttonText: {
          displayText: "Website",
        },
      },
      {
        buttonText: {
          displayText: "Contato",
        },
      },
    ],
  },
  {
    id: 3,
    parent: 2,
    pattern: /website/,
    message: "Accesse nosso website para conhecer melhor o nosso trabalho.",
    link: "https://www.puracomunicacao.com.br/",
  },
  {
    id: 4,
    parent: 2,
    pattern: /contato/,
    message: "Entre em contato, preenchendo o formulario. Em breve entraremos em contato com você.",
    link: "https://www.puracomunicacao.com.br/pt_BR/contato/",
  },
];
```

## Donate

[https://jordifernandes.com/donate/](https://jordifernandes.com/donate/)

## License

[MIT License](LICENSE)

## Contributors

- [Jordi Fernandes (@jfadev)](https://github.com/jfadev)