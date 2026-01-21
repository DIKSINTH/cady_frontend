// AppFooter.jsx

import React, { useState, useEffect } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail as MailIcon,
  Smartphone,
} from "lucide-react";
import { API_BASE } from "../config/api.js";

const API_URL = `${API_BASE}/api/footer-data`;

const FooterList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        setData(result);
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
      <footer className="cady text-white p-8 text-center">
        Loading Footer...
      </footer>
    );
  }

  if (error || !data) {
    return (
      <footer className="cady text-white p-8 text-center">
        <p>Error loading content. Please check server & database.</p>
        <p className="mt-2 text-sm text-red-200">{error}</p>
        <div className="mt-8 pt-4 border-t border-blue-400 text-sm">
          © Copyright 2025. All Rights Reserved
        </div>
      </footer>
    );
  }

  const { content, services, settings } = data;

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: MailIcon, href: `mailto:${settings?.Email}`, label: "Email" },
    {
      icon: Smartphone,
      href: `tel:${settings?.Mobile_Number}`,
      label: "Phone",
    },
  ];

  return (
    <footer className="cady text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* GRID - FULLY RESPONSIVE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* 1. About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Cady Infotech</h3>
            <p className="text-sm leading-relaxed mb-6">{content}</p>
          </div>

          {/* 2. Stay Connected */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Stay Connected</h3>

            <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 w-full sm:w-48">
              {socialLinks.slice(0, 4).map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="
                    p-3 border-2 border-white rounded-md
                    hover:bg-white hover:text-[#0091ff]
                    transition-colors flex items-center justify-center
                  "
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* 3. Our Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Our Services</h3>

            <ul className="space-y-3">
              {services.map((name, index) => {
                const safeSlug = name
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9\-]/g, "");

                return (
                  <li key={index} className="text-sm">
                    <a
                      href={`/services/${safeSlug}`}
                      className="hover:text-cyan-200 flex items-start transition-colors"
                    >
                      <span className="mr-2 text-xl font-thin leading-none">
                        »
                      </span>
                      {name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 4. Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1" />
                <p className="text-sm">{settings?.Address}</p>
              </div>

              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3" />
                <a
                  href={`tel:${settings?.Mobile_Number}`}
                  className="text-sm hover:text-cyan-200"
                >
                  {settings?.Mobile_Number}
                </a>
              </div>

              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3" />
                <a
                  href={`mailto:${settings?.Email}`}
                  className="text-sm hover:text-cyan-200"
                >
                  {settings?.Email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-12 pt-6 border-t border-blue-400 text-center">
          <p className="text-sm">© Copyright 2025. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterList;
