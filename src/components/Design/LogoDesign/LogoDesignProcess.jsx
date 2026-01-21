import React, { useEffect, useState } from "react";
import { API_BASE } from "../../../config/api.js";

const LogoDesignProcess = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/logo-design-process`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((result) => result?.length && setData(result[0]))
      .catch(() => setError("Failed to load design process"));
  }, []);

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (!data) {
    return <div className="text-center py-20">Loading Process...</div>;
  }

  return (
    <section className="w-full bg-white py-20 px-4 font-sans">
      <h2 className="text-3xl md:text-4xl text-gray-700 text-center mb-20 font-medium">
        Our Design Process
      </h2>

      {/* RELATIVE WRAPPER */}
      <div className="max-w-7xl mx-auto relative min-h-[520px]">
        {/* ARROWS (DESKTOP ONLY) */}
        <div className="hidden lg:block">
          {/* Arrow 1: Top Left → Top Right */}
          <img
            src="/arrow1.png"
            alt="Arrow 1"
            className="absolute top-[200px] left-[470px] w-[200px]"
          />

          {/* Arrow 2: Top Right → Bottom Right */}
          <img
            src="/arrow2.png"
            alt="Arrow 2"
            className="absolute top-[300px] right-[200px] h-[120px]"
          />

          {/* Arrow 3: Bottom Right → Bottom Left */}
          <img
            src="/arrow3.png"
            alt="Arrow 3"
            className="absolute bottom-[0px] right-[350px] w-[220px]"
          />
        </div>

        {/* MOBILE STACK */}
        <div className="grid grid-cols-1 gap-8 lg:hidden">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white border border-[#3498db] rounded-2xl p-8 shadow-sm"
            >
              <h3 className="cady-text text-xl font-bold mb-6">
                {data[`Design_Process${i}`]}
              </h3>
              <ul className="list-disc list-inside space-y-3 text-gray-800 font-semibold">
                <li>{data[`Design_Process${i}1`]}</li>
                <li>{data[`Design_Process${i}2`]}</li>
              </ul>
            </div>
          ))}
        </div>

        {/* DESKTOP ABSOLUTE BOXES */}
        <div className="hidden lg:block">
          {/* Top Left */}
          <div className="absolute left-50 top-20 w-[260px] bg-white border border-[#3498db] rounded-2xl p-8 shadow-sm">
            <h3 className="cady-text text-xl font-bold mb-6">
              {data.Design_Process1}
            </h3>
            <ul className="list-disc list-inside space-y-3 text-gray-800 font-semibold">
              <li>{data.Design_Process11}</li>
              <li>{data.Design_Process12}</li>
            </ul>
          </div>

          {/* Top Right */}
          <div className="absolute right-85 top-20 w-[260px] bg-white border border-[#3498db] rounded-2xl p-8 shadow-sm">
            <h3 className="cady-text text-xl font-bold mb-6">
              {data.Design_Process2}
            </h3>
            <ul className="list-disc list-inside space-y-3 text-gray-800 font-semibold">
              <li>{data.Design_Process21}</li>
              <li>{data.Design_Process22}</li>
            </ul>
          </div>

          {/* Bottom Right */}
          <div className="absolute right-20 top-105 w-[260px] bg-white border border-[#3498db] rounded-2xl p-8 shadow-sm">
            <h3 className="cady-text text-xl font-bold mb-6">
              {data.Design_Process3}
            </h3>
            <ul className="list-disc list-inside space-y-3 text-gray-800 font-semibold">
              <li>{data.Design_Process31}</li>
              <li>{data.Design_Process32}</li>
            </ul>
          </div>

          {/* Bottom Left */}
          <div className="absolute left-[450px] top-100 w-[260px] bg-white border border-[#3498db] rounded-2xl p-8 shadow-sm">
            <h3 className="cady-text text-xl font-bold mb-6">
              {data.Design_Process4}
            </h3>
            <ul className="list-disc list-inside space-y-3 text-gray-800 font-semibold">
              <li>{data.Design_Process41}</li>
              <li>{data.Design_Process42}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoDesignProcess;
