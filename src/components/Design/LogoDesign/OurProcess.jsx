import React, { useEffect, useState } from "react";
import { API_BASE } from "../../../config/api.js";

const OurProcess = () => {
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/logo-process`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch process data");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setSteps(data);
        } else {
          setSteps([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching process data:", err);
        setError("Unable to load process");
      });
  }, []);

  return (
    <section className="w-full h-auto py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-800 text-center mb-20 sm:mb-32">
          Our Process
        </h2>

        {error && <div className="text-center text-red-500 mb-10">{error}</div>}

        {/* Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 sm:gap-y-32 lg:gap-y-0 gap-x-4">
          {steps.map((item, index) => (
            <div key={index} className="relative flex flex-col items-center">
              {/* STEP BOX */}
              <div
                className="w-44 sm:w-48 h-24 sm:h-28 bg-[#3498db] flex items-center justify-center shadow-md"
                style={{
                  clipPath:
                    "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)",
                }}
              >
                <span className="text-white font-black text-lg sm:text-xl ml-4">
                  {item.step}
                </span>
              </div>

              {/* MOBILE LABEL (STACKED) */}
              <span className="sm:hidden mt-4 text-base font-semibold text-slate-800 text-center">
                {item.name}
              </span>

              {/* DESKTOP LABEL ABOVE */}
              {item.dir === "up" && (
                <div className="hidden sm:flex absolute -top-24 flex-col items-center">
                  <span className="text-lg font-bold text-slate-800 mb-2 text-center">
                    {item.name}
                  </span>
                  <div className="w-px h-12 border-l border-dashed border-slate-900 relative">
                    <div
                      className="absolute -top-1 -left-[3px] w-0 h-0 
                      border-l-[3px] border-l-transparent 
                      border-r-[3px] border-r-transparent 
                      border-b-[6px] border-b-slate-900"
                    />
                  </div>
                </div>
              )}

              {/* DESKTOP LABEL BELOW */}
              {item.dir === "down" && (
                <div className="hidden sm:flex absolute -bottom-24 flex-col items-center">
                  <div className="w-px h-12 border-l border-dashed border-slate-900 relative mb-2">
                    <div
                      className="absolute -bottom-1 -left-[3px] w-0 h-0 
                      border-l-[3px] border-l-transparent 
                      border-r-[3px] border-r-transparent 
                      border-t-[6px] border-t-slate-900"
                    />
                  </div>
                  <span className="text-lg font-bold text-slate-800 text-center">
                    {item.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
