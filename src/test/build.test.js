import { describe, it, expect } from "vitest";
import { existsSync } from "fs";
import { resolve } from "path";

describe("빌드 테스트", () => {
  it("ES 모듈 빌드 파일이 존재해야 합니다", () => {
    const esPath = resolve(process.cwd(), "dist/sweet-diagram.es.js");
    expect(existsSync(esPath)).toBe(true);
  });

  it("CommonJS 빌드 파일이 존재해야 합니다", () => {
    const cjsPath = resolve(process.cwd(), "dist/sweet-diagram.cjs.js");
    expect(existsSync(cjsPath)).toBe(true);
  });

  it("package.json의 main과 module 필드가 올바르게 설정되어야 합니다", async () => {
    const pkg = await import("../../package.json", { assert: { type: "json" } });

    expect(pkg.default.main).toBe("./dist/sweet-diagram.cjs.js");
    expect(pkg.default.module).toBe("./dist/sweet-diagram.es.js");
  });

  it("package.json의 exports 필드가 올바르게 설정되어야 합니다", async () => {
    const pkg = await import("../../package.json", { assert: { type: "json" } });

    expect(pkg.default.exports["."]).toEqual({
      import: "./dist/sweet-diagram.es.js",
      require: "./dist/sweet-diagram.cjs.js",
    });
  });
});
