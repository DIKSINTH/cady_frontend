import React from "react";
import Header from "../components/Header.jsx";
import Welcome from "../components/Mobile/Ios/Welcome.jsx";
import IosTerms from "../components/Mobile/Ios/IosTerms.jsx";
import IosServices from "../components/Mobile/Ios/IosServices.jsx";
import FooterList from "../components/FooterList.jsx";
import WhyIos from "../components/Mobile/Ios/WhyIos.jsx";

function IosDevelopment() {
  return (
    <div>
      <Header />
      <Welcome />
      <IosTerms />
      <WhyIos />
      <IosServices />
      <FooterList />
    </div>
  );
}

export default IosDevelopment;
