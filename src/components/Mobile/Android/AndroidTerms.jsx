// AndroidProcessGrid.jsx

import React, { useState, useEffect } from "react";
import { API_BASE } from "../../../config/api";

const API_URL = `${API_BASE}/api/android-terms`; // Must match your Express server URL

// --- Single Process Card Component ---
const ProcessCard = ({ term, description }) => {
  return (
    <div className="p-6 bg-white border-2 border-blue-200 rounded-lg shadow-md transition duration-300 hover:shadow-xl hover:border-blue-400 h-full flex flex-col justify-start">
      <h3 className="text-xl font-bold text-cyan-600 mb-3 text-center">
        {term}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed text-center">
        {description}
      </p>
    </div>
  );
};

// --- Main Android Process Section Component ---
const AndroidTerms = () => {
  const [processSteps, setProcessSteps] = useState([]);
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
        setProcessSteps(result); // result is an array of objects
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
        Loading process steps...
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
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Fixed Headings */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
            Our Android App Development
          </h2>
          <p className="text-xl md:text-2xl font-semibold cady-text">
            Process That Assures 100% Satisfaction
          </p>
        </div>

        {/* --- 2x3 Grid Container --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {processSteps.map((step, index) => (
            <ProcessCard
              key={index}
              term={step.term}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AndroidTerms;
