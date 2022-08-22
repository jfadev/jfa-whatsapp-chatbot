import {
  buttons,
  remoteTxt,
  remoteJson,
  remoteImg,
  remoteAudio,
  list,
  inp,
} from "./helpers";

const txtUrl = "https://raw.githubusercontent.com/git/git/master/Documentation/git.txt";
const jsonUrl = "https://raw.githubusercontent.com/jfadev/jfa-whatsapp-chatbot/master/package.json";
const imgUrl = "https://raw.githubusercontent.com/jfadev/jfa-whatsapp-chatbot/master/doc/whatsapp-chatbot.jpg";
const audioUrl = "https://github.com/exaile/exaile-test-files/raw/master/art.mp3";

describe("Helpers", () => {
  it("Test buttons", () => {
    expect(buttons(["Btn 1", "Btn 2"])).toEqual([
      {
        buttonText: {
          displayText: "Btn 1",
        },
      },
      {
        buttonText: {
          displayText: "Btn 2",
        },
      },
    ]);
  });
  it("Test remoteTxt", () => {
    expect(remoteTxt(txtUrl)).toBeTruthy();
  });
  it("Test remoteJson", () => {
    expect(JSON.stringify(remoteJson(jsonUrl))).toBeTruthy();
  });
  it("Test remoteImg", () => {
    expect(remoteImg(imgUrl).base64).toMatch(/^data\:/);
  });
  it("Test remoteAudio", () => {
    expect(remoteAudio(audioUrl).base64).toMatch(/^data\:audio\/mp3/);
  });
  it("Test list", () => {
    expect(list(["El 1", "El 2"])).toEqual([
      {
        title: " ",
        rows: [
          {
            title: "El 1",
            description: " ",
          },
          {
            title: "El 2",
            description: " ",
          },
        ],
      },
    ]);
  });
  it("Test inp", () => {
    expect(inp(1, [{ id: 1, input: "Ok" }])).toBe('Ok');
  });
});
