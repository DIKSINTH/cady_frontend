// WhyAndroidSection.jsx

import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react"; // Icon for the bullet points
import { API_BASE } from "../../../config/api";

const API_URL = `${API_BASE}/api/why-cross-platform`; // Must match your Express server URL

// --- Main Why Cross Platform Section Component ---
const WhyCrossPlatform = () => {
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
        const result = await response.json();
        setPoints(result); // result is an array of strings
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
        Loading benefits...
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

  // Split points into two columns for the display (3 items per column)
  const column1 = points.slice(0, 3);
  const column2 = points.slice(3, 6);

  // Fixed Image Path
  const androidImagePath = "../../../../public/crossplatform.png";

  return (
    <section className="bg-gray-100 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* --- Main Content Card --- */}
        <div className="bg-white p-6 sm:p-8 md:p-12 rounded-lg shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left Column: Image (Fixed) */}
            <div className="flex-shrink-0 w-full max-w-[150px] md:w-1/4">
              <img
                src={androidImagePath}
                alt="Crossplatform Logo"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Right Column: Text Content */}
            <div className="w-full md:w-3/4">
              {/* Fixed Headings */}
              <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
                Why Cross Platform
              </h2>
              <p className="text-md text-gray-600 mb-6">
                Why Choose Custom Cross Platform App Development Services?
              </p>

              {/* Dynamic Bullet Points Grid (2 columns on medium/large screens) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {/* Column 1 */}
                <div>
                  {column1.map((point, index) => (
                    <div
                      key={`col1-${index}`}
                      className="flex items-start mb-2"
                    >
                      <CheckCircle className="w-5 h-5 cady-text flex-shrink-0 mt-1 mr-2" />
                      <p className="text-base text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>

                {/* Column 2 */}
                <div>
                  {column2.map((point, index) => (
                    <div
                      key={`col2-${index}`}
                      className="flex items-start mb-2"
                    >
                      <CheckCircle className="w-5 h-5 cady-text flex-shrink-0 mt-1 mr-2" />
                      <p className="text-base text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCrossPlatform;
