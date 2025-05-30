import React, { useState, useEffect } from "react";

const Footer = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollThreshold = 100; // 100px 스크롤 후부터 투명도 변화

      if (scrollTop > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`fixed bottom-0 left-0 w-full border-t py-3 px-6 shadow-lg z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-[#0066ff]/80 backdrop-blur-md border-[#0066ff]/30"
          : "bg-white/95 backdrop-blur-sm border-gray-200"
      }`}
    >
      <div className="flex justify-center items-center">
        <p className={`text-sm transition-colors duration-300 ${scrolled ? "text-white" : "text-gray-600"}`}>
          © 2025 <span className={`font-semibold ${scrolled ? "text-white" : "text-gray-800"}`}>KIM DOWON</span> |
          <span className={`font-semibold ml-1 ${scrolled ? "text-orange-300" : "text-orange-500"}`}>Sweet-Potato</span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
