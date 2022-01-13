import fetch from "sync-fetch";

/**
 * Create buttons
 * @param {Array} buttonTexts
 */
export function buttons(buttonTexts) {
  let buttons = [];
  buttonTexts.forEach((text) => {
    buttons.push({
      buttonText: {
        displayText: text,
      },
    });
  });
  return buttons;
}

/**
 * Get remote TXT file
 * @param {String} url
 * @returns
 */
export function remoteTxt(url) {
  return fetch(url).text();
}

/**
 * Get remote JSON file
 * @param {String} url
 * @returns
 */
export function remoteJson(url) {
  return fetch(url).json();
}

/**
 * Get remote Image (jpg, png, gif) file
 * @param {String} url
 * @returns
 */
export function remoteImg(url) {
  const filename = url.split("/").pop();
  const ext = filename.split(".").pop();
  const mimeType = `image/${ext}`;
  const response = fetch(url).buffer().toString("base64");
  return {
    filename: filename,
    base64: `data:${mimeType};base64,${response}`,
  };
}

/**
 * Get remote Audio (mp3) file
 * @param {String} url
 * @returns
 */
export function remoteAudio(url) {
  const filename = url.split("/").pop();
  const response = fetch(url).buffer().toString("base64");
  return {
    filename: filename,
    base64: `data:audio/mp3;base64,${response}`,
  };
}
