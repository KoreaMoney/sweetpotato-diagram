import { describe, it, expect } from "vitest";
import * as sweet-diagram from "../index.js";

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
      expect(sweet-diagram[exportName]).toBeDefined();
      expect(typeof sweet-diagram[exportName]).toMatch(/^(function|object)$/);
    });
  });

  it("DiagramProvider가 React 컴포넌트여야 합니다", () => {
    expect(sweet-diagram.DiagramProvider).toBeDefined();
    expect(typeof sweet-diagram.DiagramProvider).toBe("function");
  });

  it("useDiagram이 훅 함수여야 합니다", () => {
    expect(sweet-diagram.useDiagram).toBeDefined();
    expect(typeof sweet-diagram.useDiagram).toBe("function");
  });

  it("SweetDiagram이 메인 컴포넌트여야 합니다", () => {
    expect(sweet-diagram.SweetDiagram).toBeDefined();
    expect(typeof sweet-diagram.SweetDiagram).toBe("function");
  });

  it("Documentation 컴포넌트가 export되어야 합니다", () => {
    expect(sweet-diagram.Documentation).toBeDefined();
    expect(typeof sweet-diagram.Documentation).toBe("function");
  });

  it("3D 관련 컴포넌트들이 export되어야 합니다", () => {
    const threeDComponents = ["Box", "Arrow", "Line", "Triangle"];

    threeDComponents.forEach((componentName) => {
      expect(sweet-diagram[componentName]).toBeDefined();
      expect(typeof sweet-diagram[componentName]).toBe("function");
    });
  });
});
