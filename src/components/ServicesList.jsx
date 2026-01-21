// OurServices.jsx

import React, { useState, useEffect } from "react";
import { API_BASE } from "../config/api.js";

const API_URL = `${API_BASE}/api/services-list`;

const getImagePath = (image) => {
  if (!image) return "";
  return `${API_BASE}/uploads/${image}`;
};

// Single service card
const ServiceCard = ({ service }) => {
  const imageUrl = getImagePath(service.image_url);

  return (
    <div
      className="
        group
        p-6 rounded-2xl h-full flex flex-col items-center text-center 
        bg-white text-gray-800 border border-gray-200 shadow-md

        /* BEAUTIFUL HOVER EFFECTS */
        transform transition-all duration-500 ease-out
        hover:scale-[1.04] hover:-translate-y-2
        hover:shadow-2xl hover:shadow-indigo-400/40
        hover:border-[#3498db] hover:bg-[#3498db]
      "
    >
      <div
        className="
          w-40 h-40 mb-4 flex items-center justify-center
          bg-white rounded-full border-4 border-gray-100 shadow-md

          /* Circle Hover Glow */
          transition-all duration-500
          group-hover:border-[#3498db] group-hover:shadow-indigo-300/50
        "
      >
        <img
          src={imageUrl}
          alt={service.name}
          className="
            w-26 h-26 object-contain transition-transform duration-500
            group-hover:scale-105
          "
        />
      </div>

      <h3 className="text-xl font-semibold mb-3 text-gray-800">
        {service.name}
      </h3>

      <p className="text-sm flex-grow text-gray-600">{service.description}</p>
    </div>
  );
};

// Main services section
const OurServices = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        if (!Array.isArray(data))
          throw new Error("Backend did not return an array");

        setServices(data);
        setIsLoading(false);
      } catch (e) {
        console.error("Fetch error:", e);
        setError(e.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading)
    return <div className="py-20 flex justify-center">Loading services...</div>;

  if (error)
    return (
      <div className="py-20 flex justify-center text-red-500">
        Error: {error}
      </div>
    );

  return (
    <section className="bg-gray-50 py-16 md:py-24 w-full">
      <div className="w-full px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Our Services
          </h2>
          <div className="w-16 h-1 cady mx-auto mt-3"></div>
        </div>

        {/* FULL WIDTH GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-10 w-full">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
