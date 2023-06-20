import React from "react";
import BookApartment from "../components/BookApartment";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import ContactForm from "../components/ContactForm";
import HeroSlider from "hero-slider/dist/HeroSlider";
import BasicSlider from "../components/HeroSlider/BasicSlider";

const HomePage = () => {
  return (
    <div>
      <main>
        <div className="pb-5">
          <BasicSlider
            Title="Mountain Haven"
            Apartmentdescription="A stunning and everlasting experience"
          />
        </div>

        <AboutUs />
        <div className="pb-4"></div>
        <ContactForm />
        <Footer />
      </main> 
    </div>
  );
};

export default HomePage;
