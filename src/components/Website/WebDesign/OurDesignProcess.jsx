// DesignProcessSteps.jsx
import "../../../css/design-process.css";
import { API_BASE } from "../../../config/api.js";

import React, { useEffect, useState } from "react";

const API_URL = `${API_BASE}/api/our-design-process`;

const Step = ({ text, index }) => {
  const isBlue = index % 2 === 0;
  const isLeft = isBlue; // blue → left diamond, orange → right diamond

  return (
    <div className="relative w-full flex justify-center mb-10">
      <div className="relative flex items-center w-full max-w-3xl">
        {/* LEFT DIAMOND */}
        {isLeft && (
          <div className="absolute -left-6 sm:-left-10 z-10">
            <div className={`diamond ${isBlue ? "bg-blue" : "bg-orange"}`}>
              {index + 1}
            </div>
          </div>
        )}

        {/* RIBBON */}
        <div className={`ribbon ${isBlue ? "ribbon-blue" : "ribbon-orange"}`}>
          {text}
        </div>

        {/* RIGHT DIAMOND */}
        {!isLeft && (
          <div className="absolute -right-6 sm:-right-10 z-10">
            <div className={`diamond ${isBlue ? "bg-blue" : "bg-orange"}`}>
              {index + 1}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const OurDesignProcess = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setSteps(data.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Loading process…</div>;
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#3498db] mb-14">
          Our Design Process
        </h2>

        {steps.map((step, index) => (
          <Step key={index} text={step} index={index} />
        ))}
      </div>
    </section>
  );
};

export default OurDesignProcess;
