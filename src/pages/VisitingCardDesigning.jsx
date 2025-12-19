import React from "react";
import Header from "../components/Header.jsx";
import Welcome from "../components/Design/VisitingCardDesign/Welcome.jsx";
import WhyChooseUs from "../components/Design/VisitingCardDesign/WhyChooseUs.jsx";
import DesignProcess from "../components/Design/VisitingCardDesign/DesignProcess.jsx";
import Features from "../components/Design/VisitingCardDesign/Features.jsx";
import VisitingCardEnd from "../components/Design/VisitingCardDesign/VisitingCardEnd.jsx";
import FooterList from "../components/FooterList.jsx";

function VisitingCardDesigning() {
  return (
    <div>
      <Header />
      <Welcome />
      <WhyChooseUs />
      <DesignProcess />
      <Features />
      <VisitingCardEnd />
      <FooterList />
    </div>
  );
}

export default VisitingCardDesigning;
