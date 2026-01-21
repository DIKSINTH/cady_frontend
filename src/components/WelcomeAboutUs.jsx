// WelcomeSection.jsx
import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { API_BASE } from "../config/api.js";

const API_URL = `${API_BASE}/api/welcome-about-us`;

const getImagePath = (filename) => {
  if (!filename) return "";
  return `${API_BASE}${filename}`;
};

const WelcomeAboutUs = () => {
  const [data, setData] = useState({
    About: "",
    Vision: "",
    Mission: "",
    Image: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch content");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-sm">Loading...</div>;
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500 text-sm px-4">
        Error: {error}
      </div>
    );
  }

  return (
    <section className="bg-white py-12 sm:py-16 md:py-24 overflow-x-hidden">
      {/* Animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }
          .float-animation {
            animation: float 3.5s ease-in-out infinite;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 leading-snug">
            Welcome to Cady Infotech
          </h2>
          <div className="w-10 sm:w-16 h-1 cady mx-auto mt-3" />
        </div>

        {/* Image + About */}
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10 md:gap-12 mb-12 sm:mb-16">
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center order-1 md:order-none">
            {data.Image && (
              <img
                src={getImagePath(data.Image)}
                alt="About Cady Infotech"
                className="
                  w-full
                  max-w-[220px]
                  sm:max-w-[300px]
                  md:max-w-md
                  object-contain
                  float-animation
                "
              />
            )}
          </div>

          {/* About */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p
              className="
                text-sm
                sm:text-base
                md:text-lg
                text-gray-600
                leading-relaxed
                max-w-[32rem]
                mx-auto
                md:mx-0
                break-words
              "
            >
              {data.About}
            </p>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {/* Vision */}
          <div
            className="
            p-5 sm:p-8
            rounded-xl
            bg-gradient-to-br from-sky-600 to-cyan-500
            shadow-md
            transition-all duration-300
            hover:shadow-xl
            text-center md:text-left
          "
          >
            <h3 className="text-lg sm:text-2xl font-semibold flex items-center justify-center md:justify-start mb-3 text-white">
              <CheckCircle className="mr-2 shrink-0" />
              Our Vision
            </h3>
            <p className="text-blue-50 text-sm sm:text-[15px] leading-relaxed break-words">
              {data.Vision}
            </p>
          </div>

          {/* Mission */}
          <div
            className="
            p-5 sm:p-8
            rounded-xl
            bg-gradient-to-br from-sky-600 to-cyan-500
            shadow-md
            transition-all duration-300
            hover:shadow-xl
            text-center md:text-left
          "
          >
            <h3 className="text-lg sm:text-2xl font-semibold flex items-center justify-center md:justify-start mb-3 text-white">
              <CheckCircle className="mr-2 shrink-0" />
              Our Mission
            </h3>
            <p className="text-cyan-50 text-sm sm:text-[15px] leading-relaxed break-words">
              {data.Mission}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeAboutUs;
