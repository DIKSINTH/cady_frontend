import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { API_BASE } from "../../../config/api";

const API_URL = `${API_BASE}/api/why-ios`;

const WhyIos = () => {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        setPoints(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-600">Loading benefits...</div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        Error loading data: {error}
      </div>
    );
  }

  // Split dynamically (2 + 2 for 4 items)
  const mid = Math.ceil(points.length / 2);
  const column1 = points.slice(0, mid);
  const column2 = points.slice(mid);

  const iosImagePath = "../../../../public/ios.png";

  return (
    <section className="bg-gray-100 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-6 sm:p-8 md:p-12 rounded-lg shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Image */}
            <div className="flex-shrink-0 w-full max-w-[150px] md:w-1/4">
              <img
                src={iosImagePath}
                alt="iOS Logo"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-3/4">
              <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
                Why iOS
              </h2>

              <p className="text-md text-gray-600 mb-6">
                Why Choose Custom iOS App Development Services?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {[column1, column2].map((column, colIndex) => (
                  <div key={colIndex}>
                    {column.map((point, index) => (
                      <div key={index} className="flex items-start mb-2">
                        <CheckCircle className="w-5 h-5 cady-text mt-1 mr-2" />
                        <p className="text-gray-700">{point}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyIos;
