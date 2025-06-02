import { describe, it, expect } from "vitest";
import * as sweetDiagram from "../index.js";

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
      expect(sweetDiagram[exportName]).toBeDefined();
      expect(typeof sweetDiagram[exportName]).toMatch(/^(function|object)$/);
    });
  });

  it("DiagramProvider가 React 컴포넌트여야 합니다", () => {
    expect(sweetDiagram.DiagramProvider).toBeDefined();
    expect(typeof sweetDiagram.DiagramProvider).toBe("function");
  });

  it("useDiagram이 훅 함수여야 합니다", () => {
    expect(sweetDiagram.useDiagram).toBeDefined();
    expect(typeof sweetDiagram.useDiagram).toBe("function");
  });

  it("SweetDiagram이 메인 컴포넌트여야 합니다", () => {
    expect(sweetDiagram.SweetDiagram).toBeDefined();
    expect(typeof sweetDiagram.SweetDiagram).toBe("function");
  });

  it("Documentation 컴포넌트가 export되어야 합니다", () => {
    expect(sweetDiagram.Documentation).toBeDefined();
    expect(typeof sweetDiagram.Documentation).toBe("function");
  });

  it("3D 관련 컴포넌트들이 export되어야 합니다", () => {
    const threeDComponents = ["Box", "Arrow", "Line", "Triangle"];

    threeDComponents.forEach((componentName) => {
      expect(sweetDiagram[componentName]).toBeDefined();
      expect(typeof sweetDiagram[componentName]).toBe("function");
    });
  });
});
