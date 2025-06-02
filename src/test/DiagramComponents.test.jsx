import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Box, Arrow, Line, Triangle, DiagramProvider, useDiagram } from "../index.js";
import { Canvas } from "@react-three/fiber";

// Canvas 래퍼 컴포넌트
const TestCanvas = ({ children }) => <Canvas>{children}</Canvas>;

describe("DiagramComponents", () => {
  describe("Box 컴포넌트", () => {
    it("Box 컴포넌트가 정상적으로 정의되어야 합니다", () => {
      expect(Box).toBeDefined();
      expect(typeof Box).toBe("function");
    });

    it("Box 컴포넌트가 Canvas 내에서 렌더링되어야 합니다", () => {
      render(
        <TestCanvas>
          <Box position={[0, 0, 0]} />
        </TestCanvas>
      );

      expect(document.body).toBeInTheDocument();
    });
  });

  describe("Arrow 컴포넌트", () => {
    it("Arrow 컴포넌트가 정상적으로 정의되어야 합니다", () => {
      expect(Arrow).toBeDefined();
      expect(typeof Arrow).toBe("function");
    });

    it("Arrow 컴포넌트가 Canvas 내에서 렌더링되어야 합니다", () => {
      render(
        <TestCanvas>
          <Arrow start={[0, 0, 0]} end={[1, 1, 0]} />
        </TestCanvas>
      );

      expect(document.body).toBeInTheDocument();
    });
  });

  describe("Line 컴포넌트", () => {
    it("Line 컴포넌트가 정상적으로 정의되어야 합니다", () => {
      expect(Line).toBeDefined();
      expect(typeof Line).toBe("function");
    });

    it("Line 컴포넌트가 Canvas 내에서 렌더링되어야 합니다", () => {
      render(
        <TestCanvas>
          <Line start={[0, 0, 0]} end={[1, 1, 0]} />
        </TestCanvas>
      );

      expect(document.body).toBeInTheDocument();
    });
  });

  describe("Triangle 컴포넌트", () => {
    it("Triangle 컴포넌트가 정상적으로 정의되어야 합니다", () => {
      expect(Triangle).toBeDefined();
      expect(typeof Triangle).toBe("function");
    });

    it("Triangle 컴포넌트가 Canvas 내에서 렌더링되어야 합니다", () => {
      render(
        <TestCanvas>
          <Triangle position={[0, 0, 0]} />
        </TestCanvas>
      );

      expect(document.body).toBeInTheDocument();
    });
  });

  describe("DiagramProvider", () => {
    it("DiagramProvider가 정상적으로 정의되어야 합니다", () => {
      expect(DiagramProvider).toBeDefined();
      expect(typeof DiagramProvider).toBe("function");
    });

    it("DiagramProvider가 children을 렌더링해야 합니다", () => {
      render(
        <DiagramProvider>
          <div data-testid="test-child">테스트 자식 요소</div>
        </DiagramProvider>
      );

      expect(screen.getByTestId("test-child")).toBeInTheDocument();
    });
  });

  describe("useDiagram 훅", () => {
    it("useDiagram 훅이 정상적으로 정의되어야 합니다", () => {
      expect(useDiagram).toBeDefined();
      expect(typeof useDiagram).toBe("function");
    });
  });
});
