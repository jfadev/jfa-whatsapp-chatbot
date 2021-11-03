# Jfa Whatsapp Chatbot 💬 (Starter)

With this node.js starter integrated whith [Venom Bot](https://github.com/orkestral/venom) library, you can easily create a WhatsApp Chatbot 💬. 
You will only need to edit your conversation flow in a single file.

Homepage: [https://jordifernandes.com/jfa-whastapp-chatbot/](https://jordifernandes.com/jfa-whastapp-chatbot/)

## Install

`yarn install`

## Conversation Flow

Edit file `./src/conversation.js`

```
[
  {
    id: 1,
    parent: 0,
    pattern: /oi|olá|ola|bom dia|boa tarde|boa noite/,
    message: "Bemvindo ao Chatbot! Escreva SIM se quer mais informação.",
  },
  {
    id: 2,
    parent: 1,
    pattern: /sim/,
    message: "Ok! Escreva opçao 1 ou 2",
  },
  {
    id: 3,
    parent: 2,
    pattern: /1/,
    message: "Voce escolheu a opcao 1!",
  },
  {
    id: 4,
    parent: 2,
    pattern: /2/,
    message: "Voce escolheu a opcao 2!",
  },
]
```

## Donate

[https://jordifernandes.com/donate/](https://jordifernandes.com/donate/)

## License

[MIT License](LICENSE)

## Contributors

- [Jordi Fernandes (@jfadev)](https://github.com/jfadev)