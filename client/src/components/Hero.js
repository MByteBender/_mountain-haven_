import React from "react";
import styles from "../styles/Hero.module.css";

function Hero(props) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6">
          <h1>Links</h1>
        </div>
        <div className="col-6">
          <h1>rechts</h1>
        </div>
      </div>
    </div>
  );
}



export default Hero;
