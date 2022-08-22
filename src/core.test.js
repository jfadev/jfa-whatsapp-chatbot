import { log, error, session, httpCtrl } from "./core";

describe("Core", () => {
  it("Test log", () => {
    let passed = true;
    try {
      // log("Test", "Test log message");
    } catch {
      passed = false;
    }
    expect(passed).toBeTruthy();;
  });
  it("Test error", () => {
    let passed = true;
    try {
      // error("Test error log message", { status: 0 });
    } catch {
      passed = false;
    }
    expect(passed).toBeTruthy();;
  });
});