import React from "react";
import Header from "../components/Header.jsx";
import CarouselHeader from "../components/CarouselHeader.jsx";
import AboutUsSection from "../components/AboutUsSection.jsx";
import OurServices from "../components/ServicesList.jsx";
import WhyChooseUsLists from "../components/WhyChooseUsLists.jsx";
import HowWeWorksList from "../components/HowWeWorksList.jsx";
import FactLists from "../components/FactLists.jsx";
import BlogLists from "../components/BlogLists.jsx";
import FooterList from "../components/FooterList.jsx";

function Home() {
  return (
    <div>
      <Header />
      <CarouselHeader />
      <AboutUsSection />
      <OurServices />
      <WhyChooseUsLists />
      <HowWeWorksList />
      <FactLists />
      <BlogLists />
      <FooterList />
    </div>
  );
}

export default Home;
