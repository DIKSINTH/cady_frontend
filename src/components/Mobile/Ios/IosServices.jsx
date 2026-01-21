import React, { useState, useEffect } from "react";
import { API_BASE } from "../../../config/api";

const API_URL = `${API_BASE}/api/ios-services`;

const IosServicesList = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setServices(result);
      } catch (e) {
        console.error("Fetch error:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center text-gray-700">
        Loading services...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 flex justify-center text-red-500">
        Error loading data: {error}
      </div>
    );
  }

  const splitIndex = Math.ceil(services.length / 2);
  const column1 = services.slice(0, splitIndex);
  const column2 = services.slice(splitIndex);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
          Services Provided
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Our Comprehensive iOS App Development Services
        </p>

        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row gap-16 text-left">
            <ul className="space-y-4">
              {column1.map((service, index) => (
                <li
                  key={index}
                  className="flex items-start text-lg text-gray-700"
                >
                  <span className="cady-text font-bold mr-3">•</span>
                  {service}
                </li>
              ))}
            </ul>

            <ul className="space-y-4 mt-8 md:mt-0">
              {column2.map((service, index) => (
                <li
                  key={index}
                  className="flex items-start text-lg text-gray-700"
                >
                  <span className="cady-text font-bold mr-3">•</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <a
            href="/contact"
            className="px-8 py-3 cady text-white rounded-md shadow-lg hover:bg-[#3498db] transition inline-block"
          >
            Contact Us Today →
          </a>
        </div>
      </div>
    </section>
  );
};

export default IosServicesList;
