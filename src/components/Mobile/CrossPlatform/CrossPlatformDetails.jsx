// CrossPlatformDetails.jsx
import React from "react";
import "../../../css/CrossPlatformDetails.css";

// --- Static Data Structure ---
const techData = [
  {
    title: "Frameworks",
    items: ["React Native", "Flutter"],
  },
  {
    title: "Platforms",
    items: ["Android Apps", "iOS Apps"],
  },
  {
    title: "SDK Integrations",
    items: [
      "Social Media",
      "Google Analytics",
      "Google Maps",
      "SMS Gateway",
      "Payment Gateway",
    ],
  },
  {
    title: "Service Integrations",
    items: [
      "Chat, Audio & Video Call",
      "Live & Video Streaming",
      "In-App Notifications",
      "In-App Purchase",
      "Image & Video Processing",
    ],
  },
];

// --- Single Column Component ---
const TechColumn = ({ title, items = [] }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
      <h3 className="text-xl font-bold cady-text mb-6 pb-1 inline-block border-b-2 border-[#3498db]">
        {title}
      </h3>
      <ul className="tech-list space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="tech-item text-gray-700 text-base leading-relaxed"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- Main Cross Platform Technology Details Section Component ---
const CrossPlatformDetails = () => {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Cross-Platform Technology Details
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Comprehensive technology stack for building robust cross-platform
            mobile applications
          </p>
        </div>
        <div className="flex flex-wrap justify-between">
          {techData.map((column, index) => (
            <TechColumn key={index} title={column.title} items={column.items} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CrossPlatformDetails;
