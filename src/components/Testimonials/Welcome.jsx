import React, { useState, useEffect } from "react";
import { API_BASE } from "../../config/api.js";
const API_URL = `${API_BASE}/api/welcome-testimonial`;

// Helper function to get backend image path
const getImagePath = (filename) => {
  if (!filename) return "";
  return `${API_BASE}/uploads/${filename}`;
};

const Welcome = () => {
  const [data, setData] = useState({
    Heading: "Crafting Digital Experiences",
    Content: "Loading content...",
    Image: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Failed to fetch data (Status: ${response.status})`);
        }

        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="py-16 flex justify-center text-gray-700 text-sm sm:text-base">
        Loading welcome Testimonial content...
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
            {data.Image && (
              <img
                src={getImagePath(data.Image)}
                alt={data.Heading}
                className="
                  w-full 
                  max-w-[220px] 
                  sm:max-w-[260px] 
                  md:max-w-[300px] 
                  lg:max-w-[360px] 
                  h-auto 
                  object-contain
                  animate-[float_4s_ease-in-out_infinite]
                "
              />
            )}
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
                flex 
                items-center 
                justify-center 
                md:justify-start 
                gap-2
              "
            >
              {data.Heading}
              <span className="cady-text text-4xl sm:text-5xl md:text-6xl">
                ♡
              </span>
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
              {data.Content}
            </p>

            {/* HASHTAG & STARS */}
            <div className="mt-6 text-center md:text-left">
              <p className="font-semibold text-gray-800 mb-2">#cadyinfotech</p>
              <div className="flex justify-center md:justify-start gap-2 cady-text text-3xl tracking-widest">
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
