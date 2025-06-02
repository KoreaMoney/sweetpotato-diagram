import { describe, it, expect } from "vitest";
import * as SweetPD from "../index.js";

describe("라이브러리 Export 테스트", () => {
  it("모든 주요 컴포넌트들이 export되어야 합니다", () => {
    const expectedExports = [
      "Connector",
      "Box",
      "Arrow",
      "Line",
      "Triangle",
      "Valve",
      "ImageBox",
      "ConnectorExamples",
      "ArrowDemo",
      "DraggableBox",
      "CodeEditor",
      "DiagramProvider",
      "useDiagram",
      "Documentation",
      "SweetDiagram",
    ];

    expectedExports.forEach((exportName) => {
      expect(SweetPD[exportName]).toBeDefined();
      expect(typeof SweetPD[exportName]).toMatch(/^(function|object)$/);
    });
  });

  it("DiagramProvider가 React 컴포넌트여야 합니다", () => {
    expect(SweetPD.DiagramProvider).toBeDefined();
    expect(typeof SweetPD.DiagramProvider).toBe("function");
  });

  it("useDiagram이 훅 함수여야 합니다", () => {
    expect(SweetPD.useDiagram).toBeDefined();
    expect(typeof SweetPD.useDiagram).toBe("function");
  });

  it("SweetDiagram이 메인 컴포넌트여야 합니다", () => {
    expect(SweetPD.SweetDiagram).toBeDefined();
    expect(typeof SweetPD.SweetDiagram).toBe("function");
  });

  it("Documentation 컴포넌트가 export되어야 합니다", () => {
    expect(SweetPD.Documentation).toBeDefined();
    expect(typeof SweetPD.Documentation).toBe("function");
  });

  it("3D 관련 컴포넌트들이 export되어야 합니다", () => {
    const threeDComponents = ["Box", "Arrow", "Line", "Triangle"];

    threeDComponents.forEach((componentName) => {
      expect(SweetPD[componentName]).toBeDefined();
      expect(typeof SweetPD[componentName]).toBe("function");
    });
  });
});
