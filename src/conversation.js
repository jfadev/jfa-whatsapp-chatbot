// Chatbot conversation flow
export default [
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
    link: "https://www.puracomunicacao.com.br/"
  },
];
