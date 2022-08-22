import { buttons, inp } from "../helpers";

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
