// DesignValuesCircles.jsx

import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
import { motion } from "framer-motion";
import { API_BASE } from "../../../config/api.js";

const API_URL = `${API_BASE}/api/web-development-design-lists`;

// Directions for each ball animation
const directions = [
  { x: -120, y: 0 }, // left
  { x: 0, y: -120 }, // top
  { x: 0, y: 120 }, // bottom
  { x: 120, y: 0 }, // right
  { x: -100, y: -100 }, // top-left
];

// Single Value Circle
const ValueCircle = ({ text, index }) => {
  const displayText = `${index + 1}. ${text}`;
  const direction = directions[index] || { x: 0, y: 0 };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: direction.x,
        y: direction.y,
        scale: 0.6,
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 1.6,
        delay: index * 0.6,
        type: "spring",
        stiffness: 90,
        damping: 12,
      }}
      whileHover={{ scale: 1.08 }}
      className="flex justify-center p-4"
    >
      <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-[#3498db] flex items-center justify-center text-center p-4 shadow-xl">
        <p className="text-white text-xs sm:text-sm md:text-base font-semibold leading-snug">
          {displayText}
        </p>
      </div>
    </motion.div>
  );
};

// Main Component
const DesignLists = () => {
  const [values, setValues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setValues(result);
        setIsLoading(false);
      } catch (e) {
        setError(e.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center text-gray-700">
        Loading design values...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 flex justify-center text-red-500">
        Error loading data: {error}
      </div>
    );
  }

  const displayValues = values.slice(0, 5);

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-10 justify-items-center">
          {displayValues.map((value, index) => (
            <ValueCircle key={index} text={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignLists;
