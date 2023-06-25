import React from "react";
import AboutUs from "../components/AboutUs";
import ContactForm from "../components/ContactForm";
import BasicSlider from "../components/HeroSlider/BasicSlider";

const HomePage = () => {
  return (
    <div>
      <main>
        <div className="pb-5">
          <BasicSlider
            Title="Mountain Haven"
            Apartmentdescription="A stunning and everlasting experience"
            image1="/mountain_3.jpg"
            image2="/mountain_2.jpg"
            image3="/mountain.jpg"
            image4="/mountain_4.jpg"
          />
        </div>

        <AboutUs />
        <div className="pb-4"></div>
        <ContactForm />
      </main>
    </div>
  );
};

export default HomePage;
