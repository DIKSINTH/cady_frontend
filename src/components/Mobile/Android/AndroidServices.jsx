// AndroidServicesList.jsx

import React, { useState, useEffect } from "react";
import { API_BASE } from "../../../config/api.js";

const API_URL = `${API_BASE}/api/android-services`; // Must match your Express server URL

// --- Main Android Services Section Component ---
const AndroidServices = () => {
  const [services, setServices] = useState([]);
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
        setServices(result); // result is an array of strings
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
        Loading services...
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

  // Split points into two columns for the display
  const splitIndex = Math.ceil(services.length / 2);
  const column1 = services.slice(0, splitIndex);
  const column2 = services.slice(splitIndex);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        {/* Fixed Headings */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
          Services Provided
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Our Comprehensive Android App Development Services
        </p>

        {/* --- Services List Container --- */}
        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row md:justify-around gap-8 md:gap-16 lg:gap-24 text-left">
            {/* Column 1 */}
            <ul className="space-y-4 list-none p-0 mx-auto md:mx-0">
              {column1.map((service, index) => (
                <li
                  key={`col1-${index}`}
                  className="flex items-start text-lg text-gray-700"
                >
                  <span className="cady-text font-bold mr-3">•</span>
                  {service}
                </li>
              ))}
            </ul>

            {/* Column 2 */}
            <ul className="space-y-4 list-none p-0 mx-auto md:mx-0 mt-8 md:mt-0">
              {column2.map((service, index) => (
                <li
                  key={`col2-${index}`}
                  className="flex items-start text-lg text-gray-700"
                >
                  <span className="cady-text font-bold mr-3">•</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fixed CTA Button */}
        <div className="mt-12">
          <button
            onClick={() => console.log("Navigate to Contact page")}
            className="px-8 py-3 cady text-white font-medium rounded-md shadow-lg hover:bg-[#3498db] transition duration-300 flex items-center justify-center mx-auto"
          >
            Contact Us Today →
          </button>
        </div>
      </div>
    </section>
  );
};

export default AndroidServices;
