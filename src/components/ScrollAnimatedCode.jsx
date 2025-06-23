import React, { useState, useEffect, useRef } from "react";

const ScrollAnimatedCode = ({ code, speed = 50, className = "" }) => {
  const [displayedCode, setDisplayedCode] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          startAnimation();
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated]);

  const startAnimation = () => {
    if (isAnimating || hasAnimated) return;

    setIsAnimating(true);
    setDisplayedCode("");

    let currentIndex = 0;

    const typeCharacter = () => {
      if (currentIndex < code.length) {
        setDisplayedCode(code.substring(0, currentIndex + 1));
        currentIndex++;

        // 더 자연스러운 타이핑을 위한 랜덤 딜레이
        const randomDelay = speed + Math.random() * 20;
        setTimeout(typeCharacter, randomDelay);
      } else {
        setIsAnimating(false);
        setHasAnimated(true);
      }
    };

    typeCharacter();
  };

  return (
    <div ref={elementRef} className={`relative ${className}`}>
      <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-gray-400">terminal</span>
        </div>
        <div className="p-4">
          <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
            <code className="text-gray-100 font-mono">
              {displayedCode}
              {isAnimating && (
                <span className="animate-pulse bg-green-400 w-2 h-5 inline-block ml-1 align-text-bottom"></span>
              )}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ScrollAnimatedCode;
