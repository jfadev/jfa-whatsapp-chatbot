import conversation from "./conversation";

describe("Conversation Flow", () => {
  for (const reply of conversation) {
    it(`Reply ${reply.id}: Check [id] field`, () => {
      expect(reply.id).toBeDefined();
      expect(reply.id).toBeGreaterThan(0);
    });
    it(`Reply ${reply.id}: Check [parent] field`, () => {
      expect(reply.parent).toBeDefined();
      expect(
        Number.isInteger(reply.parent) || 
        reply.parent instanceof Array
      ).toBeTruthy()
    });
    it(`Reply ${reply.id}: Check [pattern] field`, () => {
      expect(reply.pattern).toBeDefined();
      expect(reply.pattern instanceof RegExp).toBeTruthy();
    });
    it(`Reply ${reply.id}: Check [message] field`, () => {
      expect(
        !reply.hasOwnProperty("message") || 
        typeof reply.message === "string"
      ).toBeTruthy();
    });
    it(`Reply ${reply.id}: Check [buttons] field`, () => {
      expect(
        !reply.hasOwnProperty("buttons") ||
        (
          reply.buttons instanceof Array && 
          reply.hasOwnProperty("description") &&
          typeof reply.description === "string"
        )
      ).toBeTruthy();
    });
    it(`Reply ${reply.id}: Check [list] field`, () => {
      expect(
        !reply.hasOwnProperty("list") ||
        (
          reply.list instanceof Array && 
          reply.hasOwnProperty("button") &&
          typeof reply.button === "string" &&
          reply.hasOwnProperty("description") &&
          typeof reply.description === "string"
        )
      ).toBeTruthy();
    });
    it(`Reply ${reply.id}: Check [link] field`, () => {
      expect(
        !reply.hasOwnProperty("link") ||
        (
          typeof reply.link === "string" &&
          /^http/.test(reply.link) &&
          reply.hasOwnProperty("message") &&
          typeof reply.message === "string"
        )
      ).toBeTruthy();
    });
    it(`Reply ${reply.id}: Check [image] field`, () => {
      expect(
        !reply.hasOwnProperty("image") ||
        (
          typeof reply.image === "string" ||
          reply.image.hasOwnProperty("base64")
        )
      ).toBeTruthy();
    });
    it(`Reply ${reply.id}: Check [audio] field`, () => {
      expect(
        !reply.hasOwnProperty("audio") ||
        (
          typeof reply.audio === "string" ||
          reply.audio.hasOwnProperty("base64")
        )
      ).toBeTruthy();
    });
    it(`Reply ${reply.id}: Check [forward] field`, () => {
      expect(
        !reply.hasOwnProperty("forward") ||
        (
          typeof reply.forward === "string" &&
          /^\d+\@c\.us/.test(reply.link) &&
          reply.hasOwnProperty("message") &&
          typeof reply.message === "string"
        )
      ).toBeTruthy();
    });
  }
});
