import React, { useEffect, useState, useCallback } from "react";
import { API_BASE } from "../../config/api.js";

const TestimonialsSlide = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch testimonials
  useEffect(() => {
    fetch(`${API_BASE}/api/testimonials-slide`)
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  // Next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  }, [testimonials.length]);

  // Previous slide
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (!testimonials.length) return null;

  const { Name, Position, Description, Image } = testimonials[currentIndex];

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4 font-sans">
      {/* Header */}
      <div className="flex flex-col items-start mb-6 ml-4 md:ml-20">
        <div className="flex items-center gap-2">
          <div className="cady-text bg-white border border-[#3498db] rounded-full p-1">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
          </div>
          <span className="font-bold text-gray-800 text-sm">
            Offline Reviews
          </span>
        </div>

        <div className="flex text-cyan-500 mt-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Slider */}
      <div className="relative border border-blue-50 bg-blue-50/20 rounded-lg p-6 md:p-12 shadow-sm">
        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/271/271220.png"
            className="w-8 h-8 rotate-180 opacity-70 hover:opacity-100"
            alt="prev"
          />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/271/271220.png"
            className="w-8 h-8 opacity-70 hover:opacity-100"
            alt="next"
          />
        </button>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Image */}
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-dashed border-blue-400 p-2">
            <img
              src={Image || "https://via.placeholder.com/200"}
              alt={Name}
              className="w-full h-full rounded-full object-contain bg-white"
            />
          </div>

          {/* Text */}
          <div className="flex-1 max-w-xl">
            <p className="italic text-gray-700 text-base md:text-lg">
              “ {Description} ”
            </p>

            <div className="mt-4">
              <h4 className="text-xl font-bold text-gray-900">{Name}</h4>
              <p className="cady-text font-semibold">{Position}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSlide;
