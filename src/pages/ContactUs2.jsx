import React from "react";
import Header from "../components/Header";
import Welcome from "../components/ContactUs/Welcome";
import ContactStrip from "../components/ContactUs/ContactStrip.jsx";
import FooterList from "../components/FooterList.jsx";

function ContactUs2() {
  return (
    <div>
      <Header />
      <Welcome />
      <ContactStrip />
      <FooterList />
    </div>
  );
}

export default ContactUs2;
