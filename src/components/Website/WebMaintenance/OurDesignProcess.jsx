import { API_BASE } from "../../../config/api";
import "../../../css/design-process.css";
import React, { useEffect, useState } from "react";

const API_URL = `${API_BASE}/api/web-maintenance-design-process`;

const Step = ({ text, index }) => {
  const isBlue = index % 2 === 0;
  const isLeft = isBlue;

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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setSteps(data); // ✅ SHOW ALL 6 PROCESSES
      } catch (err) {
        console.error(err);
        setError("Failed to load design process");
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Loading process…</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  if (!steps.length) {
    return (
      <div className="py-20 text-center text-gray-500">
        Design process will be updated soon.
      </div>
    );
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#3498db] mb-14">
          Our Design Process
        </h2>

        {steps.map((step, index) => (
          <Step key={`${step}-${index}`} text={step} index={index} />
        ))}
      </div>
    </section>
  );
};

export default OurDesignProcess;
