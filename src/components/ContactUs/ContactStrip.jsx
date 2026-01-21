import React from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const ContactStrip = () => {
  return (
    <div className="w-full flex justify-center px-4 py-10 bg-white">
      <div className="w-full max-w-6xl bg-[#E5E5E5] rounded-[30px] px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left relative">
          {/* WRITE US */}
          <div className="flex flex-col items-center md:items-center gap-4">
            <h3 className="text-[#3498db] font-semibold text-xl">Write Us!</h3>

            <div className="w-14 h-14 rounded-full bg-[#3498db] flex items-center justify-center text-white text-2xl">
              <FaEnvelope />
            </div>

            <a
              href="mailto:contact@cadyinfotech.com"
              className="text-[#3498db] text-sm font-medium hover:underline break-all"
            >
              contact@cadyinfotech.com
            </a>
          </div>

          {/* DOTTED DIVIDER */}
          <div className="hidden md:block absolute left-1/3 top-0 h-full border-l-2 border-dotted border-gray-500"></div>

          {/* PING US */}
          <div className="flex flex-col items-center md:items-center gap-4">
            <h3 className="text-[#3498db] font-semibold text-xl">Ping Us!</h3>

            <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white text-2xl">
              <FaWhatsapp />
            </div>

            <a
              href="https://wa.me/917200627900"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3498db] text-sm font-medium hover:underline"
            >
              +91 7200 62 7900
            </a>
          </div>

          {/* DOTTED DIVIDER */}
          <div className="hidden md:block absolute left-2/3 top-0 h-full border-l-2 border-dotted border-gray-500"></div>

          {/* CONNECT US */}
          <div className="flex flex-col items-center md:items-center gap-4">
            <h3 className="cady-text font-semibold text-xl">Connect Us!</h3>

            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full cady flex items-center justify-center text-white text-xl"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white text-xl"
              >
                <FaInstagram />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full cady flex items-center justify-center text-white text-xl"
              >
                <FaLinkedinIn />
              </a>

              {/* X (Twitter) – Skype Removed */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white text-xl"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactStrip;
