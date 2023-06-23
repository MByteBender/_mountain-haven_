import React, { useEffect, useState } from "react";
import BookApartment from "../components/BookApartment";
import Footer from "../components/Footer";
import BasicSlider from "../components/HeroSlider/BasicSlider";
import styles from "../styles/BlogPost.module.css";
import customButton from "../styles/customButton.module.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Restaurants = () => {
  const [name, setName] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function getRestaurants() {
      const response = await fetch("/restaurants", {
        method: "GET",
      });

      const data = await response.json();
      setRestaurants(data);
    }

    getRestaurants();
  }, [statusCode]);

  return (
    <div>
      <main>
        <div className="d-flex flex-wrap">
          {restaurants.map((booking) => (
            <div key={booking.id} className="p-3 col-6 container">
              <h2>Name: {booking.name}</h2>
              <p>Email: {booking.email}</p>
              <p>Persons: {booking.persons}</p>
              <p>Message: {booking.message}</p>
              <p>Status: {booking.status}</p>
              <p>Start-Date: {booking.startDate}</p>
              <p>End-Date: {booking.endDate}</p>
              <p>ID: {booking.id}</p>
              <button className="btn btn-primary">Edit</button>
              <button
                onClick={() => deleteBooking(booking.id)}
                className="btn btn-primary ms-2"
              >
                Delete
              </button>
              <button
                onClick={() => confirmBooking(booking.id)}
                className="btn btn-primary ms-2"
              >
                confirm
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Restaurants;
