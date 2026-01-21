import React, { useState, useEffect } from "react";
import { API_BASE } from "../../config/api.js";
// ✅ Backend base URL from .env

const Welcome = () => {
  const [content, setContent] = useState({
    Title: "Have a Project in mind?",
    Sub_Title:
      "Stay in touch with us!!! We will help you to bring your dreams into reality.",
    Image: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // 🔹 Fetch contact section content
  useEffect(() => {
    fetch(`${API_BASE}/api/welcome-contact-us`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setContent(data);
      })
      .catch((err) => console.error("Error fetching contact data:", err));
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/api/send-contact-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        alert("Email failed to send");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <section className="w-full py-12 px-4 md:px-10 bg-white font-sans">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#333] mb-3">
          {content.Title}
        </h2>
        <p className="text-[#3498db] text-sm md:text-lg font-medium">
          {content.Sub_Title}
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* IMAGE */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={
              content.Image
                ? `${API_BASE}/uploads/${content.Image}`
                : "https://via.placeholder.com/500x400"
            }
            alt="Contact Illustration"
            className="w-full max-w-[500px] h-auto object-contain animate-[float_4s_ease-in-out_infinite]"
          />
        </div>

        {/* FORM */}
        <div className="w-full lg:w-[500px] bg-[#AED9F1] p-6 md:p-8 rounded-sm shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[#1a3a5a] font-bold text-sm mb-1">
                Full Name :
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Full Name"
                className="w-full p-2.5 bg-white outline-none text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-[#1a3a5a] font-bold text-sm mb-1">
                Mobile Number :
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Your Mobile No"
                className="w-full p-2.5 bg-white outline-none text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-[#1a3a5a] font-bold text-sm mb-1">
                Email ID :
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="w-full p-2.5 bg-white outline-none text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-[#1a3a5a] font-bold text-sm mb-1">
                Few Words About your Requirement :
              </label>
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write Your Message here..."
                className="w-full p-2.5 bg-white outline-none text-sm resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3498db] text-white font-bold py-3 uppercase shadow-md"
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
