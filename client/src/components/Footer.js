import React from "react";
import styles from "../styles/Footer.module.css";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <footer className={`footer mt-auto py-3 ${styles.footer}`}>
      <div className="container">
        <div className="row">
          <div className="col-5">
            <iframe
              className={` ${styles.maps_iframe_one}`}
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5427.063099850967!2d10.55315!3d47.147443!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479cc5d422737799%3A0x6ef0e0bb50af51cc!2sStanz%20bei%20Landeck%20171%2C%206500%20Stanz%20bei%20Landeck!5e0!3m2!1sde!2sat!4v1685003473507!5m2!1sde!2sat"
              width="400"
              height="200"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="col-2">
            <Link to="/impressum">
              <p>Impressum</p>
            </Link>

            <p>Information</p>

            <p>Contact</p>
            <p>AGB</p>

            <Link to="/login">
              <p>Login</p>
            </Link>
          </div>
          <div className="col-5">
            <iframe
              className={` ${styles.maps_iframe_two}`}
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5427.063099850967!2d10.55315!3d47.147443!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479cc5d422737799%3A0x6ef0e0bb50af51cc!2sStanz%20bei%20Landeck%20171%2C%206500%20Stanz%20bei%20Landeck!5e0!3m2!1sde!2sat!4v1685003473507!5m2!1sde!2sat"
              width="400"
              height="200"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
