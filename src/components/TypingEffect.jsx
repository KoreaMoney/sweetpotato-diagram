import React, { useState, useEffect, useCallback } from "react";

const TypingEffect = ({
  text,
  speed = 80,
  delay = 0,
  className = "",
  showCursor = true,
  cursorChar = "|",
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursorBlink, setShowCursorBlink] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  // 자연스러운 타이핑 속도 계산
  const getTypingDelay = useCallback(
    (char, index) => {
      let baseDelay = speed;

      // 공백 후에는 조금 더 빠르게
      if (text[index - 1] === " ") {
        baseDelay *= 0.7;
      }

      // 구두점 후에는 조금 더 느리게
      if (text[index - 1] && ".,!?;:".includes(text[index - 1])) {
        baseDelay *= 1.8;
      }

      // 단어가 끝날 때 (공백 전) 약간의 지연
      if (char === " ") {
        baseDelay *= 1.3;
      }

      // 랜덤한 변화 추가 (±30%)
      const randomFactor = 0.7 + Math.random() * 0.6;

      return Math.floor(baseDelay * randomFactor);
    },
    [speed, text]
  );

  // 타이핑 효과 구현
  useEffect(() => {
    if (currentIndex < text.length) {
      setIsTyping(true);
      const currentChar = text[currentIndex];
      const typingDelay = currentIndex === 0 ? delay : getTypingDelay(currentChar, currentIndex);

      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typingDelay);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsTyping(false);
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, delay, getTypingDelay, isComplete, onComplete]);

  // 커서 깜빡임 효과 (타이핑 중일 때는 더 빠르게)
  useEffect(() => {
    if (showCursor) {
      const cursorSpeed = isTyping ? 300 : 530;
      const cursorTimer = setInterval(() => {
        setShowCursorBlink((prev) => !prev);
      }, cursorSpeed);

      return () => clearInterval(cursorTimer);
    }
  }, [showCursor, isTyping]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <span
          className={`transition-opacity duration-75 text-blue-600 font-bold ${
            showCursorBlink ? "opacity-100" : "opacity-0"
          }`}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
};

export default TypingEffect;
