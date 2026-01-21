import React, { useState, useEffect } from "react";
import { API_BASE } from "../../../config/api";

const API_URL = `${API_BASE}/api/welcome-web-maintenance`;

// Helper function to get backend image path
const getImagePath = (filename) => {
  if (!filename) return "";
  return `${API_BASE}/uploads/${filename}`;
};

const Welcome = () => {
  const [data, setData] = useState({
    Title: "Crafting Digital Experiences",
    Description: "Loading description...",
    Image: "",
  });

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
      <div className="py-16 flex justify-center text-gray-700 text-sm sm:text-base">
        Loading Web Design details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 flex justify-center text-red-500 text-sm sm:text-base px-4 text-center">
        Error loading content: {error}
      </div>
    );
  }

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12 lg:gap-20">
          {/* IMAGE SECTION */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={getImagePath(data.Image)}
              alt={data.Title}
              className="
                w-full 
                max-w-[220px] 
                sm:max-w-[260px] 
                md:max-w-[300px] 
                lg:max-w-[360px] 
                h-auto 
                object-contain
              "
            />
          </div>

          {/* TEXT SECTION */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2
              className="
                text-2xl 
                sm:text-3xl 
                md:text-4xl 
                lg:text-5xl 
                font-extrabold 
                text-gray-800 
                mb-4 
                sm:mb-6 
                leading-snug
              "
            >
              {data.Title}
            </h2>

            <p
              className="
                text-sm 
                sm:text-base 
                md:text-lg 
                text-gray-600 
                leading-relaxed 
                max-w-xl 
                mx-auto 
                md:mx-0
              "
            >
              {data.Description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
