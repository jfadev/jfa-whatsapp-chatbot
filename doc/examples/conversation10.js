import { promises as fs } from "fs";

/**
 * Chatbot conversation flow
 * Example 10
 */
export default [
  {
    id: 1,
    parent: 0,
    pattern: /\b(?!photo\b)\w+/, // different to photo
    message: `Write "photo" for starting.`,
  },
  {
    id: 2,
    parent: [0, 1],
    pattern: /photo/,
    message: `Hi I'm a Chatbot, send a photo(s)`,
  },
  {
    id: 3,
    parent: 2,
    pattern: /\b(?!finalize\b)\w+/, // different to finalize
    message: "",
    async beforeReply(from, input, output, parents, media) {
      const uniqId = new Date().getTime();
      // Download media
      if (media) {
        const dirName = "./downloads";
        const fileName = `${uniqId}.${media.extension}`;
        const filePath = `${dirName}/${fileName}`;
        await fs.mkdir(dirName, { recursive: true });
        await fs.writeFile(filePath, await media.buffer);
        return `Photo download successfully! Send another or write "finalize".`;
      } else {
        return `Try send again or write "finalize".`;
      }
    },
    goTo(from, input, output, parents, media) {
      return 3; // return to id = 3
    },
  },
  {
    id: 4,
    parent: 2,
    pattern: /finalize/,
    message: "Thank's you!",
    end: true,
  },
];
