import React from "react";
import BookApartment from "../components/BookApartment";
import Footer from "../components/Footer";
import BasicSlider from "../components/HeroSlider/BasicSlider";

const Apartment1 = () => {
  return (
    <div>
      <main>
        <BasicSlider
          Title="Apartment 1"
          Apartmentdescription="a stunning and everlasting experience"
        />
        <div className="container text-center p-4">
          <p>
            Dolore cillum fugiat ut adipiscing non consectetur duis culpa sed
            excepteur velit officia nulla labore elit officia id fugiat. Qui
            aute est sed duis ut veniam sed culpa laboris elit nisi minim velit
            elit. Veniam dolore non anim sed aute ullamco culpa qui aliquip sit
            excepteur. Proident occaecat eiusmod adipiscing ut amet consectetur
            excepteur sint amet nostrud labore mollit occaecat ut nostrud. Non
            ipsum sed quis ea aliqua sunt cillum reprehenderit exercitation ex
            sunt id est fugiat duis. Esse sint anim esse adipiscing quis
            consectetur minim ex ullamco aliquip cupidatat commodo ullamco
            excepteur eiusmod velit reprehenderit incididunt. Elit aute aliqua
            consectetur sunt elit velit eu fugiat do quis labore magna minim
            veniam excepteur sit culpa. Nisi nisi culpa anim consectetur esse
            laborum ex adipiscing duis consectetur velit reprehenderit
            exercitation. Pariatur qui occaecat nisi nostrud reprehenderit nulla
            est proident ut id occaecat ad fugiat labore. Irure aliqua irure
            aute laboris lorem fugiat ut commodo ullamco duis. Duis aute mollit
            irure incididunt proident exercitation occaecat sed proident
            occaecat. Cillum qui ullamco sit tempor amet magna ea excepteur
            anim. Duis magna cillum voluptate velit reprehenderit reprehenderit
            quis commodo nisi nostrud est voluptate sunt nostrud eiusmod aliqua.
            Consectetur incididunt velit nulla reprehenderit sed nulla eu
            proident
          </p>
        </div>
        <BookApartment
          apartmentImage1="/apart_1.jpg"
          apartmentImage2="/apart1_kueche.jpg"
          apartmentImage3="/apart1_balkon.jpg"
          apartmentImage4="/apart1_bad.jpg"
          apartmentName="Apartment 1"
          maxGuestNumber="8"
        />
        <Footer />
      </main>
    </div>
  );
};

export default Apartment1;
