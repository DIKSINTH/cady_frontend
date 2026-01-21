import React, { useState, useEffect } from "react";
import { API_BASE } from "../../../config/api";

const API_URL = `${API_BASE}/api/cross-platform-services`;

const CrossPlatformServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error("❌ Fetch Error:", err);
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Loading services...</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  if (!services.length) {
    return <div className="py-20 text-center">No services available</div>;
  }

  const mid = Math.ceil(services.length / 2);
  const col1 = services.slice(0, mid);
  const col2 = services.slice(mid);

  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">Services Provided</h2>
        <p className="text-gray-600 mb-10">
          Our Comprehensive Cross Platform App Development Services
        </p>

        <div className="flex justify-center gap-16 text-left">
          <ul className="space-y-4">
            {col1.map((service, index) => (
              <li key={index}>• {service}</li>
            ))}
          </ul>

          <ul className="space-y-4">
            {col2.map((service, index) => (
              <li key={index}>• {service}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CrossPlatformServices;
