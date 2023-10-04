import React from "react";
import About from "../components/About";
import Footer from "../components/Footer";
import Testimonials from "./Testimonials";

import NavBarLanding from "./NavBarLanding";
import RegisterBannerLanding from "./RegisterBannerLanding";
const Landing = () => {
  return (
    <>
      <NavBarLanding />
      <RegisterBannerLanding />

      <div id="testimonials">
        <Testimonials />
      </div>
      {/* <Register></Register> */}
      <div id="about">
        <About/>
      </div>
      <Footer/>

    </>
  );
};

export default Landing;
