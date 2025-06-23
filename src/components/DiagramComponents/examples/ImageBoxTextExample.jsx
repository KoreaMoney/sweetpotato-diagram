import React, { useState } from "react";
import { ImageBox } from "../index";
import { DiagramProvider } from "../DiagramContext";

const ImageBoxTextExample = () => {
  const [selectedPosition, setSelectedPosition] = useState("bottom");
  const [selectedAlign, setSelectedAlign] = useState("center");
  const [spacing, setSpacing] = useState(8);
  const [maxWidth, setMaxWidth] = useState(120);

  const positions = [
    { value: "top", label: "위쪽 (Top)", color: "red" },
    { value: "bottom", label: "아래쪽 (Bottom)", color: "blue" },
    { value: "left", label: "왼쪽 (Left)", color: "green" },
    { value: "right", label: "오른쪽 (Right)", color: "purple" },
  ];

  const alignments = [
    { value: "left", label: "좌측 정렬" },
    { value: "center", label: "중앙 정렬" },
    { value: "right", label: "우측 정렬" },
  ];

  const textStyles = [
    { value: "text-xs text-gray-600 font-normal", label: "작은 회색 텍스트" },
    { value: "text-sm font-semibold text-blue-600", label: "중간 파란 굵은 텍스트" },
    { value: "text-lg font-black text-red-600 tracking-wide", label: "큰 빨간 굵은 텍스트" },
    { value: "text-sm font-medium text-green-700 italic", label: "녹색 기울임 텍스트" },
    { value: "text-base font-bold text-purple-600 uppercase", label: "보라색 대문자 텍스트" },
  ];

  const [selectedTextStyle, setSelectedTextStyle] = useState(textStyles[1].value);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 제목 */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🖼️ ImageBox 텍스트 위치 설정 기능</h1>
          <p className="text-gray-600">텍스트를 4방향에 배치하고 다양한 스타일을 적용해보세요!</p>
        </div>

        {/* 컨트롤 패널 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">⚙️ 설정 패널</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 텍스트 위치 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">텍스트 위치</label>
              <div className="space-y-2">
                {positions.map((pos) => (
                  <label key={pos.value} className="flex items-center">
                    <input
                      type="radio"
                      name="position"
                      value={pos.value}
                      checked={selectedPosition === pos.value}
                      onChange={(e) => setSelectedPosition(e.target.value)}
                      className="mr-2"
                    />
                    <span className={`text-${pos.color}-600 font-medium`}>{pos.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 텍스트 정렬 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">텍스트 정렬</label>
              <div className="space-y-2">
                {alignments.map((align) => (
                  <label key={align.value} className="flex items-center">
                    <input
                      type="radio"
                      name="align"
                      value={align.value}
                      checked={selectedAlign === align.value}
                      onChange={(e) => setSelectedAlign(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700">{align.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 간격 조절 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">텍스트 간격: {spacing}px</label>
              <input
                type="range"
                min="0"
                max="30"
                value={spacing}
                onChange={(e) => setSpacing(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* 최대 너비 조절 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">텍스트 최대 너비: {maxWidth}px</label>
              <input
                type="range"
                min="80"
                max="200"
                value={maxWidth}
                onChange={(e) => setMaxWidth(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* 텍스트 스타일 선택 */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">텍스트 스타일</label>
            <select
              value={selectedTextStyle}
              onChange={(e) => setSelectedTextStyle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {textStyles.map((style, index) => (
                <option key={index} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 라이브 프리뷰 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">👀 라이브 프리뷰</h2>

          <DiagramProvider width={800} height={400}>
            <div className="relative w-full h-96 bg-gray-100 border-2 border-gray-300 rounded-lg p-8">
              <ImageBox
                id="preview-box"
                x={350}
                y={150}
                width={100}
                height={80}
                text="샘플 텍스트입니다"
                icon="🚀"
                iconType="emoji"
                textPosition={selectedPosition}
                textAlign={selectedAlign}
                textSpacing={spacing}
                textMaxWidth={maxWidth}
                textClassName={selectedTextStyle}
                className="bg-white border-2 border-blue-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => alert("ImageBox 클릭됨!")}
              />

              {/* 중앙 가이드라인 */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 opacity-50"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 opacity-50"></div>
              </div>
            </div>
          </DiagramProvider>
        </div>

        {/* 4방향 예제 갤러리 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🎨 4방향 배치 예제</h2>

          <DiagramProvider width={800} height={300}>
            <div className="relative w-full h-72 bg-gray-100 border-2 border-gray-300 rounded-lg p-8">
              {/* TOP */}
              <ImageBox
                id="example-top"
                x={100}
                y={120}
                width={80}
                height={60}
                text="상단 텍스트"
                icon="🌡️"
                iconType="emoji"
                textPosition="top"
                textAlign="center"
                textSpacing={8}
                textClassName="text-sm font-bold text-red-600"
                className="bg-red-50 border-2 border-red-500 rounded-lg shadow-md"
              />

              {/* BOTTOM */}
              <ImageBox
                id="example-bottom"
                x={220}
                y={120}
                width={80}
                height={60}
                text="하단 텍스트"
                icon="⚙️"
                iconType="emoji"
                textPosition="bottom"
                textAlign="center"
                textSpacing={8}
                textClassName="text-sm font-bold text-blue-600"
                className="bg-blue-50 border-2 border-blue-500 rounded-lg shadow-md"
              />

              {/* LEFT */}
              <ImageBox
                id="example-left"
                x={400}
                y={120}
                width={80}
                height={60}
                text="좌측 텍스트"
                icon="📊"
                iconType="emoji"
                textPosition="left"
                textAlign="right"
                textSpacing={12}
                textMaxWidth={100}
                textClassName="text-sm font-bold text-green-600"
                className="bg-green-50 border-2 border-green-500 rounded-lg shadow-md"
              />

              {/* RIGHT */}
              <ImageBox
                id="example-right"
                x={520}
                y={120}
                width={80}
                height={60}
                text="우측 텍스트"
                icon="🔧"
                iconType="emoji"
                textPosition="right"
                textAlign="left"
                textSpacing={12}
                textMaxWidth={100}
                textClassName="text-sm font-bold text-purple-600"
                className="bg-purple-50 border-2 border-purple-500 rounded-lg shadow-md"
              />
            </div>
          </DiagramProvider>
        </div>

        {/* 코드 예제 */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">💻 현재 설정 코드</h2>
          <pre className="text-green-400 text-sm overflow-x-auto">
            {`<ImageBox
  id="my-box"
  x={350}
  y={150}
  width={100}
  height={80}
  text="샘플 텍스트입니다"
  icon="🚀"
  iconType="emoji"
  textPosition="${selectedPosition}"
  textAlign="${selectedAlign}"
  textSpacing={${spacing}}
  textMaxWidth={${maxWidth}}
  textClassName="${selectedTextStyle}"
  className="bg-white border-2 border-blue-500 rounded-lg shadow-lg"
  onClick={() => alert("클릭됨!")}
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ImageBoxTextExample;
