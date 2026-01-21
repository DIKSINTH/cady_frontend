import React, { useEffect, useState } from "react";
import { API_BASE } from "../../../config/api.js";
const Features = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/visiting-card-features`)
      .then((res) => res.json())
      .then((data) => setFeatures(data))
      .catch((err) => console.error("Error fetching features:", err));
  }, []);

  return (
    <section className="w-full py-16 bg-white px-4">
      <div className="max-w-6xl mx-auto">
        {/* Fixed Top Heading */}
        <h2 className="text-3xl md:text-4xl font-normal text-slate-900 text-center mb-10">
          Feature of Our Visiting Card
        </h2>

        {/* Main Feature Card */}
        <div className="bg-[#F2F2F2] rounded-2xl shadow-sm p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
          {/* Left Side: Fixed Image */}
          <div className="w-full max-w-[320px] lg:w-1/3">
            <img
              src="/visitingcard.png"
              alt="Visiting Card Features"
              className="w-full h-auto drop-shadow-xl object-contain"
            />
          </div>

          {/* Right Side: Dynamic Features Grid */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                {/* Green Checkmark Icon */}
                <div className="flex-shrink-0">
                  <svg
                    className="w-7 h-7 text-[#3498db]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                {/* Feature Text */}
                <span className="text-lg md:text-xl text-slate-700 font-medium whitespace-nowrap">
                  {feature || "Loading..."}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
