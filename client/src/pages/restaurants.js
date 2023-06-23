import React, { useEffect, useState } from "react";
import BookApartment from "../components/BookApartment";
import Footer from "../components/Footer";
import BasicSlider from "../components/HeroSlider/BasicSlider";
import styles from "../styles/BlogPost.module.css";
import customButton from "../styles/customButton.module.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function getRestaurants() {
      const response = await fetch("/restaurants", {
        method: "GET",
      });

      const data = await response.json();
      const restaurantData = data.businesses;
      setRestaurants(restaurantData);
    }

    getRestaurants();
  }, []);

  const handleMoreDetails = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      <main>
        <div className="d-flex flex-wrap">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="p-3 col-6 container">
              <h2>Restaurant: {restaurant.name}</h2>
              <p>Price: {restaurant.price}</p>
              <p>Rating: {restaurant.rating}</p>
              <p>Address: </p>
              {restaurant.location.display_address.map((element, index) => (
                <p key={index}>{element}</p>
              ))}

              <button
                className="btn btn-primary"
                onClick={() => handleMoreDetails(restaurant.url)}
              >
                More Details
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Restaurants;
