import React from "react";
import WelcomeWebDesign from "../components/Website/WebDesign/Welcome.jsx";
import Header from "../components/Header.jsx";
import DesignLists from "../components/Website/WebDesign/DesignLists.jsx";
import OurDesignProcess from "../components/Website/WebDesign/OurDesignProcess.jsx";
import WebDesignEnd from "../components/Website/WebDesign/WebDesignEnd.jsx";
import FooterList from "../components/FooterList.jsx";

function WebDesign() {
  return (
    <div>
      <Header />
      <WelcomeWebDesign />
      <DesignLists />
      <OurDesignProcess />
      <WebDesignEnd />
      <FooterList />
    </div>
  );
}

export default WebDesign;
