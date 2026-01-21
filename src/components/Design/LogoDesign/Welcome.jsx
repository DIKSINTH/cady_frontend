import React, { useState, useEffect } from "react";
import "../../../css/Mobile.css";
import { API_BASE } from "../../../config/api.js";

const API_URL = `${API_BASE}/api/welcome-logo-design`;

const getImagePath = (filename) => {
  if (!filename) return "/placeholder.png";
  return `${API_BASE}/uploads/${filename}`;
};

const Welcome = () => {
  const [data, setData] = useState({
    Title: "",
    Description: "",
    Image: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-600">
        Loading Logo Design content...
      </div>
    );
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  return (
    <section className="bg-white py-12 sm:py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-12">
          {/* Text Section */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 leading-tight">
              {data.Title || "Logo Design Services"}
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
              {data.Description || "Professional logo design services."}
            </p>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={getImagePath(data.Image)}
              alt={data.Title || "Logo Design"}
              className="
                w-full 
                max-w-[220px] 
                sm:max-w-[260px] 
                md:max-w-sm 
                h-auto 
                object-contain 
                animate-floating
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
