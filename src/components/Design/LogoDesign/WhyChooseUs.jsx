import React, { useEffect, useState } from "react";
import { API_BASE } from "../../../config/api.js";

const WhyChooseUs = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/logo-design-reasons`)
      .then((res) => res.json())
      .then((data) => setPoints(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <section className="w-full py-12 bg-white px-4 mt-10 md:mt-16 lg:mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Reduced Heading */}
        <h2 className="text-3xl md:text-4xl font-normal text-slate-800 text-center mb-8">
          Why Choose Us
        </h2>

        {/* Reduced Gray Box */}
        <div className="bg-[#E5E5E5] rounded-xl shadow-sm p-6 md:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-14">
          {/* Left Image */}
          <div className="w-full max-w-[240px] md:w-1/3 flex justify-center">
            <div className="bg-white rounded-full shadow-inner border border-blue-100 overflow-hidden aspect-square w-full">
              <img
                src="/logodesign.png"
                alt="Logo Design Process"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Points */}
          <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
            {points.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-3 transition-transform hover:translate-x-1 duration-300"
              >
                {/* Smaller Check Icon */}
                <div className="flex-shrink-0">
                  <svg
                    className="w-7 h-7 md:w-8 md:h-8 text-[#3498db]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>

                {/* Smaller Text */}
                <span className="text-lg md:text-xl text-slate-700 font-medium">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
