import React, { useEffect, useState } from "react";
import { API_BASE } from "../../../config/api.js";
const VisitingCardEnd = () => {
  const [bottomDesc, setBottomDesc] = useState("");

  useEffect(() => {
    // Fetch dynamic description from backend
    fetch(`${API_BASE}/api/visiting-card-end`)
      .then((res) => res.json())
      .then((data) => setBottomDesc(data.description))
      .catch((err) => console.error("Error fetching description:", err));
  }, []);

  return (
    <div className="w-full bg-white font-sans">
      {/* --- Section 2: Bottom Description (Dynamic) --- */}
      <section className="py-16 px-4 text-center max-w-5xl mx-auto border-t border-gray-100">
        <p className="text-[#333333] text-2xl md:text-3xl font-light leading-snug mb-8">
          {bottomDesc || "Loading description..."}
        </p>

        {/* Fixed Contact Us Today Button */}
        <button className="bg-[#3498db] hover:bg-[#0096ce] text-white font-medium py-3 px-8 rounded flex items-center justify-center mx-auto transition-all duration-300 shadow-sm">
          Contact Us Today
          <span className="ml-2 text-lg">➔</span>
        </button>
      </section>
    </div>
  );
};

export default VisitingCardEnd;
