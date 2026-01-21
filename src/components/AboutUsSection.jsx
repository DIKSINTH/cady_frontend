// AboutUsSection.jsx
import React, { useState, useEffect } from "react";
import { API_BASE } from "../config/api.js";

const API_URL = `${API_BASE}/api/about-content`;

const AboutUsSection = () => {
  const [data, setData] = useState({ Scroll_Content: "", About: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dynamic content from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (e) {
        console.error("Fetch error:", e);
        setError(e.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center text-gray-700">
        Loading content...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 flex justify-center text-red-500">
        Error loading content: {error}. Check if your backend server is running.
      </div>
    );
  }

  return (
    <section className="w-full bg-white flex flex-col items-center justify-center pt-8 md:pt-12">
      {/* 1. Marquee / Dynamic Scroll Line */}
      <div className="w-11/12 max-w-7xl h-15 md:h-15 bg-blue-200 rounded-full overflow-hidden mb-12 shadow-inner">
        <div className="flex items-center h-full">
          <marquee
            behavior="scroll"
            direction="left"
            scrollamount="8"
            className="text-md md:text-base text-gray-500 font-medium whitespace-nowrap px-4"
          >
            {data.Scroll_Content || "Loading scroll content..."}
          </marquee>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="w-full max-w-9xl px-4 sm:px-6 lg:px-8 text-center pb-20">
        {data.About && (
          <>
            {/* Heading */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              Get To Know Us
            </h2>

            {/* Separator Line */}
            <div className="w-12 h-1 cady mx-auto mb-10"></div>

            {/* Paragraph */}
            <p
              className="flex justify-center leading-relaxed 
        text-xs sm:text-sm md:text-base lg:text-lg 
        text-gray-600 mb-4 max-w-6xl mx-auto"
            >
              {data.About}
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default AboutUsSection;
