import React, { useEffect, useState } from "react";
import styles from "../styles/Footer.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function Footer(props) {
  const { logout } = useAuth();

  const [temperature, setTemperature] = useState(null);
  const [maxTemperature, setMaxTemperature] = useState(null);
  const [minTemperature, setMinTemperature] = useState(null);

  //Coordinates
  const latitude = 47.15;
  const longitude = 10.55;

  async function getWeatherData() {
    return fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=Europe%2FBerlin`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      })
      .then((data) => {
        const temperature = data.hourly.temperature_2m;

        const lastTemperature = temperature[temperature.length - 1];
        console.log("temeperature: " + lastTemperature);
        const maxTemperature = data.daily.temperature_2m_max;
        const minTemperature = data.daily.temperature_2m_min;

        return {
          weatherData: {
            temperature: lastTemperature,
            maxTemperature: maxTemperature,
            minTemperature: minTemperature,
          },
        };
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const weatherData = await getWeatherData();
        setTemperature(weatherData.weatherData.temperature);
        setMaxTemperature(weatherData.weatherData.maxTemperature);
        setMinTemperature(weatherData.weatherData.minTemperature);
      } catch (error) {
        console.error(error);
      }
    }

    fetchWeatherData();
  }, []);

  return (
    <footer className={`footer mt-auto py-3 ${styles.footer}`}>
      <div className="container">
        <div className="row">
          <div className="col-5">
            <div className="bg-warning">
              <h2>Weather</h2>
              <p>Temprature: {temperature} °C</p>
              <p>Max-Temprature: {maxTemperature} °C</p>
              <p>Min-Temprature: {minTemperature} °C</p>
            </div>
          </div>

          <div className="col-2 ">
            <Link to="/impressum">
              <p>Impressum</p>
            </Link>

            <p>Information</p>

            <p>Contact</p>
            <p>AGB</p>

            <Link to="/admin/login">
              <p>Login</p>
            </Link>
            <button type="submit" className="btn btn-primary" onClick={logout}>
              <span>Logout</span>
            </button>
          </div>
          <div className="col-5">
            <iframe
              className={` ${styles.maps_iframe_two}`}
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5427.063099850967!2d10.55315!3d47.147443!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479cc5d422737799%3A0x6ef0e0bb50af51cc!2sStanz%20bei%20Landeck%20171%2C%206500%20Stanz%20bei%20Landeck!5e0!3m2!1sde!2sat!4v1685003473507!5m2!1sde!2sat"
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
