import React from "react";
import styles from "../styles/HeadSlider.module.css";

function HeadSlider(props) {
  return (
    <div className={`container-fluid ${styles.outerContainer}`}>
      <h1 className="text-center text-uppercase">{props.heading}</h1>
    </div>
  );
}

export default HeadSlider;
