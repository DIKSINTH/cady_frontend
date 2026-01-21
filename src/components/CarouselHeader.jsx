// CarouselHeader.jsx
import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { API_BASE } from "../config/api.js";

const API_URL = `${API_BASE}/api/slides`;

const getImagePath = (url) => `${API_BASE}/uploads/${url}`;

const Slide = ({ slide, isActive }) => {
  return (
    <div
      className={`absolute inset-0 w-full h-full px-4 md:px-10 transition-opacity duration-1000 ${
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      } flex items-center justify-center`}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between h-full">
        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="font-bold text-white text-[26px] sm:text-3xl md:text-5xl mb-3">
            {slide.title}
          </h1>

          <p className="text-white text-base sm:text-lg max-w-lg">
            {slide.description}
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src={getImagePath(slide.image_url)}
            alt={slide.title}
            className="object-contain max-w-[180px] sm:max-w-xs md:max-w-md lg:max-w-lg drop-shadow-xl animate-floating"
          />
        </div>
      </div>
    </div>
  );
};

const CarouselHeader = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setSlides);
  }, []);

  const nextSlide = useCallback(
    () => setCurrentIndex((i) => (i === slides.length - 1 ? 0 : i + 1)),
    [slides.length]
  );

  const prevSlide = useCallback(
    () => setCurrentIndex((i) => (i === 0 ? slides.length - 1 : i - 1)),
    [slides.length]
  );

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(nextSlide, 8000);
      return () => clearInterval(interval);
    }
  }, [slides.length, nextSlide]);

  return (
    <>
      <style>{`
        /* FLOATING IMAGE */
        @keyframes floating {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-floating {
          animation: floating 3.5s ease-in-out infinite;
        }

        /* ROTATE SYMBOL */
        @keyframes cycleRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .rotate-symbol {
          animation: cycleRotate 4s linear infinite;
        }

        /* SHAPES */
        .triangle {
          width: 0; height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 18px solid orange;
        }
        .rhombus {
          width: 18px; height: 18px;
          border: 3px solid orange;
          transform: rotate(45deg);
        }
        .rectangle {
          width: 26px; height: 14px;
          border: 3px solid orange;
        }
        .pentagon {
          width: 34px; height: 34px;
          clip-path: polygon(50% 0%, 95% 35%, 77% 90%, 23% 90%, 5% 35%);
          border: 3px solid yellow;
        }
        .square {
          width: 18px; height: 18px;
          border: 3px solid yellow;
        }

        .x-symbol {
          width: 22px; height: 22px;
          position: relative;
        }
        .x-symbol::before,
        .x-symbol::after {
          content: "";
          position: absolute;
          left: 50%;
          width: 3px; height: 22px;
          background: yellowgreen;
        }
        .x-symbol::before { transform: rotate(45deg); }
        .x-symbol::after { transform: rotate(-45deg); }

        .circle-symbol {
          width: 24px; height: 24px;
          border: 3px solid orange;
          border-radius: 50%;
        }

        .glow { filter: drop-shadow(0 0 6px currentColor); }

        /* Smaller symbols on mobile & tablet */
        @media (max-width: 1024px) {
          .triangle { border-bottom-width: 12px; }
          .square, .rhombus, .circle-symbol { width: 14px; height: 14px; }
          .rectangle { width: 20px; height: 10px; }
          .x-symbol { width: 16px; height: 16px; }
        }
      `}</style>

      <header className="relative w-full cady overflow-hidden h-[300px] sm:h-[400px] md:h-[380px] lg:h-[350px]">
        {/* ===== MOBILE + TABLET (ONLY 6 SYMBOLS) ===== */}
        <div className="absolute top-5 left-5 rotate-symbol triangle glow opacity-30 lg:hidden"></div>
        <div className="absolute top-20 right-10 rotate-symbol square glow opacity-30 lg:hidden"></div>
        <div className="absolute bottom-10 left-10 rotate-symbol rhombus glow opacity-30 lg:hidden"></div>
        <div className="absolute bottom-20 right-16 rotate-symbol rectangle glow opacity-30 lg:hidden"></div>
        <div className="absolute top-10 left-1/2 rotate-symbol circle-symbol glow opacity-25 lg:hidden"></div>
        <div className="absolute bottom-14 right-1/2 rotate-symbol x-symbol glow opacity-30 lg:hidden"></div>

        {/* ===== DESKTOP ONLY (ALL 12 SYMBOLS) ===== */}
        <div className="hidden lg:block absolute top-5 left-5 rotate-symbol triangle glow opacity-30"></div>
        <div className="hidden lg:block absolute top-20 left-40 rotate-symbol square glow opacity-30"></div>
        <div className="hidden lg:block absolute bottom-10 left-160 rotate-symbol rhombus glow opacity-30"></div>
        <div className="hidden lg:block absolute bottom-30 left-30 rotate-symbol rectangle glow opacity-30"></div>
        <div className="hidden lg:block absolute top-10 left-3/7 rotate-symbol pentagon glow opacity-30"></div>
        <div className="hidden lg:block absolute top-5 right-10 rotate-symbol square glow opacity-30"></div>
        <div className="hidden lg:block absolute bottom-20 right-50 rotate-symbol rhombus glow opacity-30"></div>
        <div className="hidden lg:block absolute bottom-30 left-130 rotate-symbol triangle glow opacity-30"></div>
        <div className="hidden lg:block absolute top-40 left-240 rotate-symbol x-symbol glow opacity-30"></div>
        <div className="hidden lg:block absolute top-20 right-50 rotate-symbol x-symbol glow opacity-30"></div>
        <div className="hidden lg:block absolute top-10 left-100 rotate-symbol circle-symbol glow opacity-25"></div>
        <div className="hidden lg:block absolute bottom-40 right-80 rotate-symbol circle-symbol glow opacity-30"></div>

        {/* Slides */}
        {slides.map((slide, index) => (
          <Slide
            key={slide.id || index}
            slide={slide}
            isActive={index === currentIndex}
          />
        ))}

        {/* Arrows */}
        <div className="absolute top-1/2 w-full flex justify-between px-4 md:px-10 z-30">
          <button onClick={prevSlide} className="p-2 text-white">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button onClick={nextSlide} className="p-2 text-white">
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-white" : "bg-white/40"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </header>
    </>
  );
};

export default CarouselHeader;
