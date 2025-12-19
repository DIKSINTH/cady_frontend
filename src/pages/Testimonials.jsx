import React from "react";
import Header from "../components/Header";
import Welcome from "../components/Testimonials/Welcome";
import TestimonialsSlide from "../components/Testimonials/TestimonialsSlide.jsx";
import GoogleReviews from "../components/Testimonials/GoogleReviews.jsx";
import FooterList from "../components/FooterList.jsx";

function Testimonials() {
  return (
    <div>
      <Header />
      <Welcome />
      <TestimonialsSlide />
      <GoogleReviews />
      <FooterList />
    </div>
  );
}

export default Testimonials;
