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
    return buttons;
  });
}

/**
 * Get remote TXT file
 * @param {String} url
 * @param {Number|null} cacheDelay
 * @returns
 */
export async function remoteTxt(url, cacheDelay = null) {
  const response = await fetch(url)
    .then((res) => res.text())
    .catch((err) => console.error("Error (remoteTxt): ", err));
  return response;
}

/**
 * Get remote JSON file
 * @param {String} url
 * @param {Number|null} cacheDelay
 * @returns
 */
export async function remoteJson(url, cacheDelay = null) {
  const response = await fetch(url)
    .then((res) => res.json())
    .catch((err) => console.error("Error (remoteJson): ", err));
  return response;
}

/**
 * Get remote Image (jpg, png, gif) file
 * @param {String} url
 * @param {Number|null} cacheDelay
 * @returns
 */
export async function remoteImg(url, cacheDelay = null) {
  const filename = url.split("/").pop();
  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };
  const response = await fetch(url)
    .then((res) => res.blob())
    .then(blobToBase64)
    .catch((err) => console.error("Error (remoteImg): ", err));
  return {
    filename: filename,
    base64: response,
  };
}

/**
 * Get remote Audio (mp3) file
 * @param {String} url
 * @param {Number|null} cacheDelay
 * @returns
 */
export async function remoteAudio(url, cacheDelay = null) {
  const filename = url.split("/").pop();
  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };
  const response = await fetch(url)
    .then((res) => res.blob())
    .then(blobToBase64)
    .catch((err) => console.error("Error (remoteAudio): ", err));
  return {
    filename: filename,
    base64: response,
  };
}
