import { inp, med } from "../helpers";
import { promises as fs } from "fs";

const menu = "Menu:\n\n" +
  "1. Send Text\n" +
  "2. Send Image\n";

/**
 * Chatbot conversation flow
 * Example 11
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /\/admin/,
    from: "5584384738389@c.us", // only respond to this number
    message: menu
  },
  {
    id: 2,
    parent: [1, 5],
    pattern: /.*/,
    message: "",
    async beforeReply(from, input, output, parents, media) {
      switch (input) {
        case "1":
          return `Write your text:`;
        case "2":
          return `Send your image:`;
      }
    },
  },
  {
    id: 3,
    parent: 2,
    pattern: /.*/,
    message: `Write "/save" to save or cancel with "/cancel".`,
  },
  {
    id: 4,
    parent: 3,
    pattern: /\/save/,
    message: "",
    async beforeReply(from, input, output, parents, media) {
      let txt = "";
      let img = null;
      let filePath = null;
      const type = inp(2, parents);
      if (type === "1") {
        txt = inp(3, parents);
      } else if (type === "2") {
        img = med(3, parents); // media from parent replies
      }
      if (img) {
        const uniqId = new Date().getTime();
        const dirName = ".";
        const fileName = `${uniqId}.${img.extension}`;
        filePath = `${dirName}/${fileName}`;
        await fs.writeFile(filePath, await img.buffer);
      } else {
        const uniqId = new Date().getTime();
        const dirName = ".";
        const fileName = `${uniqId}.txt`;
        await fs.writeFile(filePath, txt);
      }
      return `Ok, text or image saved. Thank you very much!`;
    },
    end: true,
  },
  {
    id: 5,
    parent: 3,
    pattern: /\/cancel/,
    message: menu,
    goTo(from, input, output, parents, media) {
      return 2;
    },
    clearParents: true, // reset parents
  },
];