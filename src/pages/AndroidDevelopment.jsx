import React from "react";
import Header from "../components/Header.jsx";
import Welcome from "../components/Mobile/Android/Welcome.jsx";
import AndroidTerms from "../components/Mobile/Android/AndroidTerms.jsx";
import WhyAndroid from "../components/Mobile/Android/WhyAndroid.jsx";
import AndroidServices from "../components/Mobile/Android/AndroidServices.jsx";
import FooterList from "../components/FooterList.jsx";

function AndroidDevelopment() {
  return (
    <div>
      <Header />
      <Welcome />
      <AndroidTerms />
      <WhyAndroid />
      <AndroidServices />
      <FooterList />
    </div>
  );
}

export default AndroidDevelopment;
