// HowWeWorksList.jsx

import React, { useState, useEffect } from "react";
import { API_BASE } from "../config/api.js";

const API_URL = `${API_BASE}/api/how-we-works-list`;

// Helper function to get the image path
const getImagePath = (filename) => {
  if (!filename) return "";
  return `${API_BASE}/uploads/${filename}`;
};

// --- Single Point Card Component ---
const ChooseUsCard = ({ item }) => {
  const imageUrl = getImagePath(item.image_url);

  return (
    <div
      className="
        p-6 md:p-8 bg-white border border-gray-200 rounded-2xl 
        h-full flex flex-col items-center text-center 

        /* Modern Hover Effect */
        transform transition-all duration-500 ease-out
        hover:scale-[1.06] hover:-translate-y-2 
        hover:border-indigo-300 hover:shadow-2xl 
        hover:shadow-indigo-300/40 hover:bg-indigo-50
      "
    >
      {/* Icon/Image */}
      <div
        className="
          w-24 h-24 mb-4 flex items-center justify-center rounded-full 
          bg-white border-4 border-gray-100 shadow-md 
          transition-all duration-500 hover:border-[#3498db] hover:shadow-[#3498db]
        "
      >
        <img
          src={imageUrl}
          alt={item.name}
          className="w-16 h-16 object-contain transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Name */}
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
        {item.name}
      </h3>

      {/* Description: Render HTML from DB */}
      <div
        className="text-sm text-gray-600 flex-grow leading-relaxed"
        dangerouslySetInnerHTML={{ __html: item.description }}
      ></div>
    </div>
  );
};

// --- Main "How We Works" Section Component ---
const HowWeWorksList = () => {
  const [points, setPoints] = useState([]);
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
        const data = await response.json();
        setPoints(data);
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
        Loading points...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 flex justify-center text-red-500">
        Error loading data: {error}. Check if your Express server is running on
        port 5000.
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            How We Works
          </h2>
          <div className="w-12 h-1 cady mx-auto mt-3"></div>
        </div>

        {/* Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((item) => (
            <ChooseUsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorksList;
