import React from "react";
import Welcome from "../components/Website/WebMaintenance/Welcome.jsx";
import Header from "../components/Header.jsx";
import DesignLists from "../components/Website/WebMaintenance/DesignLists.jsx";
import OurDesignProcess from "../components/Website/WebMaintenance/OurDesignProcess.jsx";
import WebMaintenanceEnd from "../components/Website/WebMaintenance/WebMaintenanceEnd.jsx";
import FooterList from "../components/FooterList.jsx";

function WebMaintenance() {
  return (
    <div>
      <Header />
      <Welcome />
      <DesignLists />
      <OurDesignProcess />
      <WebMaintenanceEnd />
      <FooterList />
    </div>
  );
}

export default WebMaintenance;
