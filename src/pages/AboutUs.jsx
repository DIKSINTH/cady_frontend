import React from "react";
import Header from "../components/Header";
import WelcomeAboutUs from "../components/WelcomeAboutUs.jsx";
import OurValues from "../components/OurValues.jsx";
import LogoSlide from "../components/LogoSlide.jsx";
import Footer from "../components/FooterList.jsx";

function AboutUs() {
  return (
    <div>
      <Header />
      <WelcomeAboutUs />
      <OurValues />
      <LogoSlide />
      <Footer />
    </div>
  );
}

export default AboutUs;
