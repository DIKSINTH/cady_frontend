// OurValues.jsx
import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { API_BASE } from "../config/api.js";

const API_URL = `${API_BASE}/api/our-values`;

/* ---------------- HEXAGON ---------------- */
const Hexagon = ({ text, side }) => {
  const clipPath =
    side === "left"
      ? "polygon(20% 0%, 100% 0%, 80% 50%, 100% 100%, 20% 100%, 0% 50%)"
      : "polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%, 20% 50%)";

  return (
    <div
      className={`
        relative w-32 h-16 flex items-center justify-center
        text-white font-semibold text-sm bg-[#3498db]
        ${side === "left" ? "mr-16 md:mr-16 sm:mr-0" : ""}
        sm:mx-auto
      `}
      style={{ clipPath }}
    >
      {text}
    </div>
  );
};

/* ---------------- TIMELINE ITEM ---------------- */
const TimelineItem = ({ value, index }) => {
  const isRight = index % 2 !== 0;

  return (
    <li className="relative flex md:items-center py-8 sm:py-10">
      {/* MOBILE DOT */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 md:hidden">
        <div className="w-3 h-3 rounded-full bg-[#3498db]" />
      </div>

      {/* LEFT SIDE (DESKTOP) */}
      {!isRight && (
        <div className="hidden md:flex w-1/2 justify-end items-center">
          <Hexagon text={value} side="left" />
        </div>
      )}

      {/* CENTER DOT (DESKTOP) */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10">
        <div className="w-3 h-3 rounded-full bg-[#3498db]" />
      </div>

      {/* CONNECTOR LINE (DESKTOP ONLY) */}
      <div
        className={`
          hidden md:block absolute top-1/2 h-[2px] bg-black w-20
          ${isRight ? "left-1/2" : "right-1/2"}
        `}
      />

      {/* RIGHT SIDE (DESKTOP) */}
      {isRight && (
        <div className="hidden md:flex w-1/2 justify-start items-center ml-82">
          <Hexagon text={value} side="right" />
        </div>
      )}

      {/* MOBILE CONTENT */}
      <div className="md:hidden w-full pl-10">
        <Hexagon text={value} />
      </div>
    </li>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
const OurValues = () => {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to load values");
        const data = await res.json();
        setValues(data.slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchValues();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Loading values...</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <section className="bg-white py-16 md:py-24 overflow-x-hidden">
      <div className="container mx-auto max-w-4xl px-4">
        {/* HEADING */}
        <div className="flex items-center justify-center mb-12">
          <Check className="text-[#3498db] mr-2" />
          <h2 className="text-3xl font-semibold">Our Values</h2>
        </div>

        {/* TIMELINE */}
        <div className="relative">
          {/* DESKTOP LINE */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] bg-black" />

          {/* MOBILE LINE */}
          <div className="md:hidden absolute left-4 top-0 h-full w-[2px] bg-black" />

          <ul>
            {values.map((value, index) => (
              <TimelineItem key={index} value={value} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OurValues;
