import React, { useEffect, useState } from "react";
import { API_BASE } from "../../../config/api.js";
const WhyChooseUs = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/visiting-card-reasons`)
      .then((res) => res.json())
      .then((data) => setCardData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <section className="w-full py-16 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Fixed Top Heading matching image style */}
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-16">
          Why Choose Us?
        </h2>

        {/* Responsive Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {cardData.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#3498db] rounded-2xl p-8 md:p-10 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[320px] justify-center"
            >
              {/* Box Heading matching image blue color */}
              <h3 className="text-[#3498db] text-xl md:text-2xl font-bold mb-6">
                {item.title}
              </h3>

              {/* Box Description */}
              <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-[280px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
