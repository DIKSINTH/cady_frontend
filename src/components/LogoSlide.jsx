import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../css/TechSlider.css";
import { API_BASE } from "../config/api";

const API_URL = `${API_BASE}/api/logo-slide`;

const VISIBLE_COUNT = 6;

const TechSlider = () => {
  const [logos, setLogos] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch logos");
        return res.json();
      })
      .then((data) => {
        // ✅ duplicate logos for infinite loop
        setLogos([...data, ...data]);
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ auto slide (patient)
  useEffect(() => {
    if (!logos.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [logos]);

  // ✅ reset silently for infinite loop with mobile adjustment
  useEffect(() => {
    if (current === logos.length / 2) {
      // default reset time
      let resetTime = 600;

      // increase reset time for mobile screens
      if (window.innerWidth <= 480) {
        resetTime = 8000; // example: double for mobile
      } else if (window.innerWidth <= 768) {
        resetTime = 4000; // example: slightly longer for tablets
      }

      setTimeout(() => {
        setCurrent(0);
      }, resetTime); // must match CSS transition time
    }
  }, [current, logos]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? logos.length / 2 - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => prev + 1);
  };

  if (!logos.length) {
    return <div className="text-center py-10">Loading technologies…</div>;
  }

  return (
    <section className="tech-slider-wrapper">
      <h2>Technological Solution We Offer</h2>

      <div className="slider-box">
        <button className="arrow" onClick={prevSlide}>
          <ChevronLeft />
        </button>

        <div className="slide-window">
          <div
            className="slide-track"
            style={{
              transform: `translateX(-${(current * 100) / VISIBLE_COUNT}%)`,
            }}
          >
            {logos.map((logo, index) => (
              <div className="slide" key={index}>
                <img
                  src={`${API_BASE}${logo.Image_url}`}
                  alt="Technology Logo"
                />
              </div>
            ))}
          </div>
        </div>

        <button className="arrow" onClick={nextSlide}>
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};

export default TechSlider;
