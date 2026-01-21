// HowWeWorksList.jsx
import React, { useState, useEffect } from "react";
import { API_BASE } from "../config/api.js";

const API_URL = `${API_BASE}/api/fact-lists`;

// Helper function to get the image path
const getImagePath = (filename) => {
  if (!filename) return "";
  return `${API_BASE}/uploads/${filename}`;
};

// --- Single Point Card Component ---
const ChooseUsCard = ({ item }) => {
  const imageUrl = getImagePath(item.image_url);
  const [count, setCount] = useState(0);

  // Animate the count from 0 to item.count
  useEffect(() => {
    const end = parseInt(item.count, 10);
    if (isNaN(end)) return;

    let start = 0;
    const duration = 1000;
    const intervalTime = 10;
    const increment = Math.ceil(end / (duration / intervalTime));

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(start);
    }, intervalTime);

    return () => clearInterval(counter);
  }, [item.count]);

  return (
    <div
      className="
        p-6 bg-white border border-gray-200 rounded-2xl
        flex flex-col items-center text-center
        transition-shadow duration-300 hover:shadow-lg hover:bg-gray-50
      "
    >
      {/* Icon/Image */}
      <div className="w-24 h-24 mb-4 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200">
        <img
          src={imageUrl}
          alt={item.name}
          className="w-16 h-16 object-contain"
        />
      </div>

      {/* Name */}
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
        {item.name}
      </h3>

      {/* Animated Count + "+" */}
      <div className="text-3xl font-bold text-[#3498db] mb-3">{count}+</div>

      {/* Description */}
      <div
        className="text-sm text-gray-600 flex-grow leading-relaxed"
        dangerouslySetInnerHTML={{ __html: item.description }}
      ></div>
    </div>
  );
};

// --- Main "How We Works" Section Component ---
const FactLists = () => {
  const [points, setPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dynamic content from backend
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
        Error loading data: {error}. Check if your Express server is running.
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

        {/* RESPONSIVE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.slice(0, 4).map((item) => (
            <ChooseUsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FactLists;
