import React from "react";
import Header from "../components/Header.jsx";
import Welcome from "../components/Website/WebDevelopment/Welcome.jsx";
import DesignLists from "../components/Website/WebDevelopment/DesignLists.jsx";
import WebDevelopmentDesignProcess from "../components/Website/WebDevelopment/WebDevelopmentDesignProcess.jsx";
import WebDevelopmentEnd from "../components/Website/WebDevelopment/WebDevelopmentEnd.jsx";
import FooterList from "../components/FooterList.jsx";
function WebDevelopment() {
  return (
    <div>
      <Header />
      <Welcome />
      <DesignLists />
      <WebDevelopmentDesignProcess />
      <WebDevelopmentEnd />
      <FooterList />
    </div>
  );
}

export default WebDevelopment;
