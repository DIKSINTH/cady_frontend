import React from "react";
import Header from "../components/Header.jsx";
import Welcome from "../components/Mobile/CrossPlatform/Welcome.jsx";
import CrossPlatformTerms from "../components/Mobile/CrossPlatform/CrossPlatformTerms.jsx";
import CrossPlatformDetails from "../components/Mobile/CrossPlatform/CrossPlatformDetails.jsx";
import WhyCrossPlatform from "../components/Mobile/CrossPlatform/WhyCrossPlatform.jsx";
import CrossPlatformServices from "../components/Mobile/CrossPlatform/CrossPlatformServices.jsx";
import FooterList from "../components/FooterList.jsx";

function CrossPlatformDevelopment() {
  return (
    <div>
      <Header />
      <Welcome />
      <CrossPlatformTerms />
      <CrossPlatformDetails />
      <WhyCrossPlatform />
      <CrossPlatformServices />
      <FooterList />
    </div>
  );
}

export default CrossPlatformDevelopment;
