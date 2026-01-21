import React, { useState, useEffect } from "react";
import { API_BASE } from "../../../config/api";

const API_URL = `${API_BASE}/api/web-maintenance-end`;

const WebMaintenanceEnd = () => {
  const [content, setContent] = useState({
    Content1: "",
    Content2: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);

        // 🔹 Do NOT throw error for 404
        if (!response.ok && response.status !== 404) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setContent(result);
      } catch (e) {
        console.error("Fetch error:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center text-gray-500 animate-pulse">
        Loading call to action...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 flex justify-center text-red-500">
        Error loading CTA: {error}
      </div>
    );
  }

  // ✅ Safe fallback content
  const testimonialText =
    content.Content1 ||
    "Don't just take our word for it—read what our clients have to say about their experience working with us.";

  const contactText =
    content.Content2 ||
    "Ready to take your online presence to the next level? Contact us today and let's build something great together.";

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Testimonials */}
        <div className="mb-14">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            {testimonialText}
          </p>
          <a
            href="/testimonials"
            className="mt-6 inline-block px-8 py-3 cady text-white rounded-full shadow-lg hover:bg-[#3498db] transition"
          >
            Testimonials →
          </a>
        </div>

        {/* Contact */}
        <div>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            {contactText}
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block px-8 py-3 cady text-white rounded-full shadow-lg hover:bg-[#3498db] transition"
          >
            Contact Us Today →
          </a>
        </div>
      </div>
    </section>
  );
};

export default WebMaintenanceEnd;
