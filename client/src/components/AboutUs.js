import React from "react";
import styles from "../styles/AboutUs.module.css";

function AboutUs(props) {
  return (
    <div className="container-fluid ps-0">
      <div className="row">
        <div className="col-6">
          <img
            className={`${styles.aboutUsImage} `}
            src="/about_us.JPG"
            alt="about us"
          ></img>
        </div>
        <div className="col-6">
          <h1>About us</h1>
          <p>
            Dolor nostrud ullamco elit sed aliqua minim voluptate officia
            officia. Fugiat deserunt minim lorem officia ullamco sint ex sit
            laboris commodo quis voluptate veniam deserunt incididunt qui
            cupidatat. Nisi esse excepteur quis enim ipsum minim anim mollit id.
            Tempor tempor adipiscing ullamco proident incididunt consectetur est
            minim eu ea. Culpa dolore consequat reprehenderit mollit minim sit
            consequat pariatur esse commodo nisi ad pariatur occaecat velit non.
            Est ipsum aute exercitation esse amet reprehenderit laboris magna in
            dolor sed culpa qui duis anim. Deserunt cupidatat reprehenderit est
            cillum nulla fugiat excepteur quis ullamco laboris exercitation
            cillum sint cupidatat in nostrud consequat. Velit culpa sed sit ut
            tempor et aliqua non tempor pariatur consectetur laborum lorem
            dolore labore non enim adipiscing reprehenderit. Dolore fugiat ex
            qui pariatur et deserunt consequat fugiat non ad dolore. Minim ex
            nulla fugiat dolor consectetur sint amet ullamco qui aute occaecat
            lorem fugiat commodo. Consequat aliqua commodo pariatur do lorem sed
            sint nulla ex nostrud est laborum minim ea esse. Duis anim non
            incididunt exercitation nisi ex consequat commodo dolor officia
            tempor do do esse. Voluptate laborum exercitation veniam duis veniam
            nisi sint ad laborum adipiscing labore minim. Dolor lorem sint eu
            excepteur ipsum dolor aliqua aute cupidatat deserunt reprehenderit.
            Duis enim consequat proident est excepteur quis excepteur voluptate
            incididunt. Duis ea anim ea consectetur est reprehenderit nisi
            aliqua quis nisi velit laboris dolor ad. Consectetur reprehenderit
            elit ullamco ea non id magna tempor enim consectetur reprehenderit
            quis lorem excepteur pariatur esse adipiscing. Excepteur officia
            pariatur ad sit reprehenderit eiusmod exercitation ullamco culpa
            laborum amet tempor exercitation fugiat exercitation est officia
            mollit.
          </p>
        </div>
      </div>
      <div className="row"></div>
    </div>
  );
}

export default AboutUs;
