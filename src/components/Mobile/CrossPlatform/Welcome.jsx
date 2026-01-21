// AndroidIntroSection.jsx

import React, { useState, useEffect } from "react";
import "../../../css/Mobile.css"; // Import custom CSS for animation
import { API_BASE } from "../../../config/api";

const API_URL = `${API_BASE}/api/welcome-cross-platform`; // Must match your Express server URL

// Helper function to get backend image path
const getImagePath = (filename) => {
  if (!filename) return "";
  return `${API_BASE}/uploads/${filename}`;
};

// --- Main Android Introduction Component ---
const Welcome = () => {
  const [data, setData] = useState({
    Title: "Cross Platform Application Development",
    Description: "Loading description...",
    Image: "",
  });
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
        Loading Cross Platform content...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 flex justify-center text-red-500">
        Error loading content: {error}. Check if your Express server is running
        on port 5000.
      </div>
    );
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Two-Column Layout */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          {/* Left Column (Title & Description) */}
          <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 leading-snug">
              {data.Title || "Android Application Development"}
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl md:max-w-full mx-auto md:mx-0">
              {data.Description ||
                "Cady Infotech stands out as a leader in Android app development due to our commitment to quality, innovation, and customer satisfaction. Our team of expert developers utilizes the latest technologies and best practices to create customized solutions that cater to specific business needs."}
            </p>
          </div>

          {/* Right Column (Floating Image) */}
          <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center p-4">
            <img
              src={getImagePath(data.Image)}
              alt={data.Title}
              className="w-full max-w-xs sm:max-w-sm h-auto object-contain animate-floating"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
