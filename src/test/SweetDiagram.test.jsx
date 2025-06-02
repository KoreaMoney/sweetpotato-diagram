import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SweetDiagram } from "../index.js";

describe("SweetDiagram", () => {
  it("컴포넌트가 정상적으로 렌더링되어야 합니다", () => {
    render(<SweetDiagram />);

    // SweetDiagram이 렌더링되는지 확인
    expect(document.body).toBeInTheDocument();
  });

  it("export된 컴포넌트들이 정상적으로 임포트되어야 합니다", () => {
    // SweetDiagram이 정의되어 있는지 확인
    expect(SweetDiagram).toBeDefined();
    expect(typeof SweetDiagram).toBe("function");
  });
});
