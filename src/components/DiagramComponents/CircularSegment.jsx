import React from "react";

const CircularSegment = ({
  id = "",
  centerX = 150,
  centerY = 150,
  radius = 100,
  startAngle = 0,
  endAngle = 60,
  title = "",
  subtitle = "",
  icon = "",
  color = "#0066ff",
  darkColor = "#0044aa",
  textColor = "white",
  opacity = 1,
  onClick = null,
  className = "",
  segmentClassName = "", // 세그먼트 추가 스타일
  shadowClassName = "", // 그림자 추가 스타일
  titleClassName = "", // 제목 추가 스타일
  subtitleClassName = "", // 부제목 추가 스타일
  iconClassName = "", // 아이콘 추가 스타일
}) => {
  // 각도를 라디안으로 변환 (각도 범위 보정)
  const normalizedStartAngle = startAngle % 360;
  const normalizedEndAngle = endAngle % 360;
  const startRad = (normalizedStartAngle * Math.PI) / 180;
  const endRad = (normalizedEndAngle * Math.PI) / 180;

  // 세그먼트의 경로 계산
  const angleSpan = endAngle - startAngle;
  const largeArcFlag = angleSpan > 180 ? 1 : 0;

  // 외부 반지름 좌표
  const outerStartX = centerX + radius * Math.cos(startRad);
  const outerStartY = centerY + radius * Math.sin(startRad);
  const outerEndX = centerX + radius * Math.cos(endRad);
  const outerEndY = centerY + radius * Math.sin(endRad);

  // 내부 반지름 (도넛 모양을 위해)
  const innerRadius = radius * 0.45;
  const innerStartX = centerX + innerRadius * Math.cos(startRad);
  const innerStartY = centerY + innerRadius * Math.sin(startRad);
  const innerEndX = centerX + innerRadius * Math.cos(endRad);
  const innerEndY = centerY + innerRadius * Math.sin(endRad);

  // 도넛 모양 SVG 경로 생성 - 올바른 방향으로
  const pathData = [
    `M ${outerStartX} ${outerStartY}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`,
    `L ${innerEndX} ${innerEndY}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`,
    `Z`,
  ].join(" ");

  // 텍스트 위치 계산 (도넛 중앙)
  const midAngle = (startAngle + endAngle) / 2;
  const midRad = (midAngle * Math.PI) / 180;
  const textRadius = (radius + innerRadius) / 2; // 도넛의 중간 지점
  const textX = centerX + textRadius * Math.cos(midRad);
  const textY = centerY + textRadius * Math.sin(midRad);

  // 3D 효과를 위한 그림자 경로 (약간 오프셋)
  const shadowOffset = 4;
  const shadowOuterStartX = outerStartX + shadowOffset;
  const shadowOuterStartY = outerStartY + shadowOffset;
  const shadowOuterEndX = outerEndX + shadowOffset;
  const shadowOuterEndY = outerEndY + shadowOffset;
  const shadowInnerStartX = innerStartX + shadowOffset;
  const shadowInnerStartY = innerStartY + shadowOffset;
  const shadowInnerEndX = innerEndX + shadowOffset;
  const shadowInnerEndY = innerEndY + shadowOffset;

  const shadowPathData = [
    `M ${shadowOuterStartX} ${shadowOuterStartY}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${shadowOuterEndX} ${shadowOuterEndY}`,
    `L ${shadowInnerEndX} ${shadowInnerEndY}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${shadowInnerStartX} ${shadowInnerStartY}`,
    `Z`,
  ].join(" ");

  const handleClick = (event) => {
    if (onClick) {
      onClick(event, { id, title, subtitle });
    }
  };

  return (
    <g
      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${className}`}
      onClick={handleClick}
      data-segment-id={id}
    >
      {/* 3D 그림자 효과 */}
      <path d={shadowPathData} fill={darkColor} opacity={Math.min(0.4, opacity * 0.6)} className={shadowClassName} />

      {/* 메인 세그먼트 */}
      <path
        d={pathData}
        fill={color}
        stroke="white"
        strokeWidth="2"
        opacity={opacity}
        className={`hover:brightness-110 transition-all duration-300 ${segmentClassName}`}
      />

      {/* 아이콘 */}
      {icon && (
        <text
          x={textX}
          y={textY - 10}
          textAnchor="middle"
          fill={textColor}
          fontSize="16"
          className={`pointer-events-none ${iconClassName}`}
        >
          {icon}
        </text>
      )}

      {/* 제목 */}
      {title && (
        <text
          x={textX}
          y={textY + 5}
          textAnchor="middle"
          fill={textColor}
          fontSize="10"
          fontWeight="bold"
          className={`pointer-events-none uppercase tracking-wide ${titleClassName}`}
        >
          {title}
        </text>
      )}

      {/* 부제목 */}
      {subtitle && (
        <text
          x={textX}
          y={textY + 16}
          textAnchor="middle"
          fill={textColor}
          fontSize="7"
          className={`pointer-events-none ${subtitleClassName}`}
        >
          {subtitle}
        </text>
      )}
    </g>
  );
};

export default CircularSegment;
