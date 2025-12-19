import React from "react";
import Header from "../components/Header.jsx";
import Welcome from "../components/Design/LogoDesign/Welcome.jsx";
import LogoImportanceChart from "../components/Design/LogoDesign/LogoImportanceChart.jsx";
import LogoDesignProcess from "../components/Design/LogoDesign/LogoDesignProcess.jsx";
import WhyChooseUs from "../components/Design/LogoDesign/WhyChooseUs.jsx";
import OurProcess from "../components/Design/LogoDesign/OurProcess.jsx";
import LogoDesignEnd from "../components/Design/LogoDesign/LogoDesignEnd.jsx";
import FooterList from "../components/FooterList.jsx";

function LogoDesigning() {
  return (
    <div>
      <Header />
      <Welcome />
      <LogoImportanceChart />
      <LogoDesignProcess />
      <WhyChooseUs />
      <OurProcess />
      <LogoDesignEnd />
      <FooterList />
    </div>
  );
}

export default LogoDesigning;
