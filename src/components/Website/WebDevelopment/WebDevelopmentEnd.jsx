// WebDesignCTA.jsx

import React, { useState, useEffect } from "react";
import { API_BASE } from "../../../config/api";

const API_URL = `${API_BASE}/api/web-development-end`; // Must match your Express server URL

// --- Main Web Design CTA Component ---
const WebDesignEnd = () => {
  const [content, setContent] = useState({
    Content1: "",
    Content2: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dynamic content from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setContent(result);
        setIsLoading(false);
      } catch (e) {
        console.error("Fetch error:", e);
        setError(e.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center text-gray-700">
        Loading call to action...
      </div>
    );
  }

  if (error || !content.Content1 || !content.Content2) {
    return (
      <div className="py-20 flex justify-center text-red-500">
        Error loading content: {error || "Missing Content1 or Content2"}. Check
        server (port 5000).
      </div>
    );
  }

  // Fallback/Default texts if the DB fails to provide
  const defaultTestimonialText =
    "Don't just take our word for it—read what our clients have to say about their experience working with us. Check out our testimonials to hear firsthand how we've helped businesses achieve their online goals.";
  const defaultContactText =
    "Ready to take your online presence to the next level? Contact us today to discuss your website design needs and let's create something amazing together.";

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        {/* --- Testimonials Block --- */}
        <div className="mb-12 md:mb-16">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mx-auto max-w-2xl">
            {content.Content1 || defaultTestimonialText}
          </p>
          <a
            href="/testimonials"
            className="mt-6 inline-block px-8 py-3 cady text-white font-medium rounded-full shadow-lg hover:bg-[#3498db] transition duration-300 flex items-center justify-center mx-auto w-auto"
          >
            Testimonials →
          </a>
        </div>

        {/* --- Contact Us Block --- */}
        <div>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mx-auto max-w-2xl">
            {content.Content2 || defaultContactText}
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block px-8 py-3 cady text-white font-medium rounded-full shadow-lg hover:bg-[#3498db] transition duration-300 flex items-center justify-center mx-auto w-auto"
          >
            Contact Us Today →
          </a>
        </div>
      </div>
    </section>
  );
};

export default WebDesignEnd;
