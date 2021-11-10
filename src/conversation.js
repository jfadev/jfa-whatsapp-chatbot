/**
 * Chatbot conversation flow
 * Your custom conversation
 */
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
