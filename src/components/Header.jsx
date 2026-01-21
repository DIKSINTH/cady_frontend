import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaBars,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";
import logo from "../assets/logodesign.png";

// --- Logo Component ---
const Logo = () => (
  <div className="absolute left-4 md:left-6 flex flex-col items-center md:items-start">
    {/* Logo */}
    <div className="w-16 h-16 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center mb-2">
      <img src={logo} alt="Logo" className="w-22 h-18" />
    </div>

    {/* Company Name */}
    <span className="text-[12px] sm:text-base md:text-sm font-normal tracking-wider text-white text-center md:text-left">
      CADY INFOTECH PRIVATE LIMITED
    </span>
  </div>
);

// --- Header Component ---
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeLink, setActiveLink] = useState("HOME");

  const navLinks = [
    "HOME",
    "ABOUT US",
    "WEBSITE",
    "MOBILE APP",
    "GRAPHICS",
    "BLOG",
    "TESTIMONIALS",
    "CONTACT US",
  ];

  const dropdowns = {
    WEBSITE: ["Website Design", "Website Development", "Website Maintenance"],
    "MOBILE APP": [
      "Android Development",
      "iOS Development",
      "Cross Platform Development",
    ],
    GRAPHICS: ["Logo Designing", "Visiting Card Designing"],
  };

  return (
    <>
      <header className="cady h-[18vh] w-full shadow-md fixed top-0 left-0 z-50 border-b-0">
        <div className="max-w-7xl mx-auto">
          {/* --- 1. Top Bar --- */}
          <div className="flex justify-between items-center py-4">
            <div className="pl-4 sm:pl-6 lg:pl-8">
              <Logo />
            </div>

            <div className="flex flex-col items-center md:items-end space-y-2 pr-4 sm:pr-6 lg:pr-8 absolute right-4 top-4">
              {/* Desktop Social Icons */}
              <div className="hidden md:flex items-center space-x-4 lg:space-x-5 text-white">
                <FaFacebookF
                  className="hover:text-gray-200 cursor-pointer transition duration-300"
                  size={18}
                />
                <FaInstagram
                  className="hover:text-gray-200 cursor-pointer transition duration-300"
                  size={18}
                />
                <FaLinkedinIn
                  className="hover:text-gray-200 cursor-pointer transition duration-300"
                  size={18}
                />
                <FaWhatsapp
                  className="hover:text-gray-200 cursor-pointer transition duration-300"
                  size={18}
                />
              </div>

              {/* Desktop Call Button */}
              <a
                href="tel:+917200627900"
                className="mt-2 hidden sm:flex items-center bg-white cady-text font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-100 transition duration-300"
              >
                <FaPhoneAlt className="mr-2" size={14} />
                +91 7200 62 7900
              </a>

              {/* --- MOBILE MENU TOGGLE --- */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="mt-2 sm:hidden text-white focus:outline-none p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes size={22} />
                ) : (
                  <FaBars size={22} />
                )}
              </button>
            </div>
          </div>

          {/* --- 2. Separator Line (Desktop + Tablet) --- */}
          <div className="opacity-50 hidden sm:block px-4 sm:px-6 lg:px-8 absolute left-[18vw] md:left-[22vw] right-[18vw] md:right-[22vw] top-[12vh]">
            <div className="border-t border-white border-opacity-40 mt-1" />
          </div>

          {/* --- 3. Desktop Navigation --- */}
          <nav className="hidden sm:block absolute left-0 right-0 top-[13vh]">
            <div className="flex justify-center items-center space-x-6 md:space-x-4 py-3 font-medium px-4 sm:px-6 lg:px-8">
              {navLinks.map((link) => {
                const hasDropdown = dropdowns[link];

                return (
                  <div key={link} className="relative group">
                    <a
                      href={`${link.toLowerCase().replace(/\s/g, "-")}`}
                      onClick={() => setActiveLink(link)}
                      className={`text-sm md:text-[12px] tracking-wider uppercase flex items-center transition-all duration-300 relative px-2 py-1 hover:text-[#8badb5] focus:text-[#8badb5] ${
                        activeLink === link
                          ? "text-[#fffafa] font-bold"
                          : "text-white"
                      }`}
                    >
                      {link}
                      {hasDropdown && <span className="ml-1">▾</span>}
                      <span className="absolute left-0 -bottom-1 w-0 h-[2px] cady transition-all duration-300 group-hover:w-full" />
                    </a>

                    {hasDropdown && (
                      <div className="absolute left-0 mt-2 w-40 bg-white cady-text rounded shadow-lg opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50 text-sm">
                        {hasDropdown.map((item) => (
                          <a
                            key={item}
                            href={`${item.toLowerCase().replace(/\s/g, "-")}`}
                            onClick={() => setActiveLink(item)}
                            className={`block px-4 py-2 transition text-[12px] rounded ${
                              activeLink === item
                                ? "cady cady-text font-bold"
                                : "hover:bg-[#00bcd4] hover:text-white text-[#0091ff]"
                            }`}
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* ---------- MOBILE NAV ---------- */}
          {isMobileMenuOpen && (
            <nav className="sm:hidden absolute top-full left-0 w-full cady shadow-lg z-50">
              <div className="flex flex-col p-4 space-y-2 text-white font-medium">
                <a
                  href="/"
                  className="py-2 px-3 rounded hover:bg-white hover:text-[#0091ff]"
                >
                  HOME
                </a>
                <a
                  href="/about-us"
                  className="py-2 px-3 rounded hover:bg-white hover:text-[#0091ff]"
                >
                  ABOUT US
                </a>
                {/* WEBSITE */}{" "}
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "website" ? null : "website",
                    )
                  }
                  className="py-2 px-3 rounded flex justify-between items-center hover:bg-white hover:text-[#0091ff]"
                >
                  {" "}
                  WEBSITE{" "}
                  <span>{openDropdown === "website" ? "▴" : "▾"}</span>{" "}
                </button>{" "}
                {openDropdown === "website" && (
                  <div className="ml-4 space-y-1">
                    {" "}
                    {[
                      ["Website Design", "/website-design"],
                      ["Website Development", "/website-development"],
                      ["Website Maintenance", "/website-maintenance"],
                    ].map(([label, link]) => (
                      <a
                        key={label}
                        href={link}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1 px-3 rounded hover:bg-white hover:text-[#0091ff]"
                      >
                        {" "}
                        ▸ {label}{" "}
                      </a>
                    ))}{" "}
                  </div>
                )}
                {/* MOBILE APP */}{" "}
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === "app" ? null : "app")
                  }
                  className="py-2 px-3 rounded flex justify-between items-center hover:bg-white hover:text-[#0091ff]"
                >
                  {" "}
                  MOBILE APP{" "}
                  <span>{openDropdown === "app" ? "▴" : "▾"}</span>{" "}
                </button>{" "}
                {openDropdown === "app" && (
                  <div className="ml-4 space-y-1">
                    {" "}
                    <a
                      href="/android-development"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-1 px-3 rounded hover:bg-white hover:text-[#0091ff]"
                    >
                      {" "}
                      ▸ Android{" "}
                    </a>{" "}
                    <a
                      href="/ios-development"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-1 px-3 rounded hover:bg-white hover:text-[#0091ff]"
                    >
                      {" "}
                      ▸ iOS{" "}
                    </a>{" "}
                    <a
                      href="/cross-platform-development"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-1 px-3 rounded hover:bg-white hover:text-[#0091ff]"
                    >
                      {" "}
                      ▸ Cross Platform{" "}
                    </a>{" "}
                  </div>
                )}
                {/* MOBILE APP */}{" "}
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "graphics" ? null : "graphics",
                    )
                  }
                  className="py-2 px-3 rounded flex justify-between items-center hover:bg-white hover:text-[#0091ff]"
                >
                  {" "}
                  GRAPHICS{" "}
                  <span>{openDropdown === "graphics" ? "▴" : "▾"}</span>{" "}
                </button>{" "}
                {openDropdown === "graphics" && (
                  <div className="ml-4 space-y-1">
                    {" "}
                    <a
                      href="/logo-designing"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-1 px-3 rounded hover:bg-white hover:text-[#0091ff]"
                    >
                      {" "}
                      ▸ Logo Design{" "}
                    </a>{" "}
                    <a
                      href="/visiting-card-designing"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-1 px-3 rounded hover:bg-white hover:text-[#0091ff]"
                    >
                      {" "}
                      ▸ Visiting Card{" "}
                    </a>{" "}
                  </div>
                )}
                <a
                  href="/blog"
                  className="py-2 px-3 rounded hover:bg-white hover:text-[#0091ff]"
                >
                  BLOG
                </a>
                <a
                  href="/testimonials"
                  className="py-2 px-3 rounded hover:bg-white hover:text-[#0091ff]"
                >
                  TESTIMONIALS
                </a>
                <a
                  href="/contact-us"
                  className="py-2 px-3 rounded hover:bg-white hover:text-[#0091ff]"
                >
                  CONTACT US
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Spacer */}
      <div className="h-[18vh] cady" />
    </>
  );
};

export default Header;
