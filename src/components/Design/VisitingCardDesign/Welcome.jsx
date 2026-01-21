// AndroidIntroSection.jsx

import React, { useState, useEffect } from "react";
import "../../../css/Mobile.css";
import { API_BASE } from "../../../config/api.js";

const API_URL = `${API_BASE}/api/welcome-visiting-card`;

// Helper function to get backend image path
const getImagePath = (filename) => {
  if (!filename) return "";
  return `${API_BASE}/uploads/${filename}`;
};

const Welcome = () => {
  const [data, setData] = useState({
    Title: "Visiting Card Designing",
    Description: "Loading description...",
    Image: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch content from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="py-20 flex justify-center text-gray-600">
        Loading Visiting Card content...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="py-20 flex justify-center text-red-500 text-center px-4">
        Error loading content: {error}
        <br />
        Make sure your backend is running on port 5000.
      </div>
    );
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 leading-snug">
              {data.Title}
            </h2>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {data.Description}
            </p>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center p-4">
            {data.Image && (
              <img
                src={getImagePath(data.Image)}
                alt={data.Title}
                className="w-full max-w-xs sm:max-w-sm h-auto object-contain animate-floating"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
