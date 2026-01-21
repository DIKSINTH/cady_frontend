import React from "react";

const LogoImportanceChart = () => {
  const data = [
    {
      title: "Brand Identity",
      items: ["Visual Representation", "Consistency"],
    },
    {
      title: "First Impressions",
      items: ["Attracts Attention", "Professionalism"],
    },
    {
      title: "Differentiation",
      items: ["Stands Out", "Memorable"],
    },
    {
      title: "Brand Loyalty",
      items: ["Emotional Connection", "Trust"],
    },
    {
      title: "Marketing Tool",
      items: ["Versatile Branding", "Promotional Value"],
    },
    {
      title: "Business Growth",
      items: ["Expansion Opportunities", "Increased Sales"],
    },
  ];

  return (
    <div className="w-full bg-white p-4 md:p-10 font-sans">
      {/* Main Title */}
      <h1 className="text-2xl md:text-4xl text-gray-800 text-center mb-12 font-medium">
        The Importance of a Logo
      </h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 items-start max-w-7xl mx-auto">
        {data.map((column, index) => (
          <div key={index} className="flex flex-col">
            {/* Header Box */}
            <div className="bg-[#3498db] text-white py-2 px-3 rounded-md text-center text-sm font-bold shadow-sm mb-4">
              {column.title}
            </div>

            {/* List with Decorative Lines */}
            <div className="relative pl-4 border-l-2 border-gray-200 ml-2 space-y-6">
              {column.items.map((item, i) => (
                <div key={i} className="relative flex items-center">
                  {/* Horizontal Connector Line */}
                  <div className="absolute -left-4 w-4 h-[2px] bg-gray-200"></div>

                  <span className="text-gray-600 text-sm leading-tight pl-2">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoImportanceChart;
