import React, { useState, useEffect } from "react";

const Welcome = () => {
  const [content, setContent] = useState({
    Title: "Have a Project in mind?",
    Sub_Title:
      "Stay in touch with us!!! We will help you to bring your dreams into reality.",
    Image: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/welcome-contact-us")
      .then((res) => res.json())
      .then((data) => {
        if (data) setContent(data);
      })
      .catch((err) => console.error("Error fetching contact data:", err));
  }, []);

  return (
    <section className="w-full py-12 px-4 md:px-10 bg-white font-sans">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#333] mb-3">
          {content.Title}
        </h2>
        <p className="text-[#00AEEF] text-sm md:text-lg font-medium">
          {content.Sub_Title}
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={
              content.Image
                ? `http://localhost:5000/uploads/${content.Image}`
                : "https://via.placeholder.com/500x400"
            }
            alt="Contact Illustration"
            className="w-full max-w-[500px] h-auto object-contain animate-[float_4s_ease-in-out_infinite]"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-[500px] bg-[#AED9F1] p-6 md:p-8 rounded-sm shadow-sm">
          <form className="space-y-4">
            <div>
              <label className="block text-[#1a3a5a] font-bold text-sm mb-1">
                Full Name :
              </label>
              <input
                type="text"
                placeholder="Enter Your Full Name"
                className="w-full p-2.5 bg-white outline-none text-sm focus:ring-2 focus:ring-[#00AEEF]"
                required
              />
            </div>

            <div>
              <label className="block text-[#1a3a5a] font-bold text-sm mb-1">
                Mobile Number :
              </label>
              <input
                type="tel"
                placeholder="Enter Your Mobile No"
                className="w-full p-2.5 bg-white outline-none text-sm focus:ring-2 focus:ring-[#00AEEF]"
                required
              />
            </div>

            <div>
              <label className="block text-[#1a3a5a] font-bold text-sm mb-1">
                Email ID :
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full p-2.5 bg-white outline-none text-sm focus:ring-2 focus:ring-[#00AEEF]"
                required
              />
            </div>

            <div>
              <label className="block text-[#1a3a5a] font-bold text-sm mb-1">
                Few Words About your Requirement :
              </label>
              <textarea
                rows="4"
                placeholder="Write Your Message here..."
                className="w-full p-2.5 bg-white outline-none text-sm resize-none focus:ring-2 focus:ring-[#00AEEF]"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0089D1] hover:bg-[#0076B4] text-white font-bold py-3 uppercase shadow-md"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
