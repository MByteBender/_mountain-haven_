import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function OpenBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getBookings() {
      const token = Cookies.get("token"); // Retrieve the token from the cookie
      if (!token) {
        alert("You are not loged in!");
        return;
      }
      const response = await fetch("/openBookings", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // includes the token in the Authorization header
        },
      });

      const data = await response.json();
      setBookings(data);
    }

    getBookings();
  }, []);

  return (
    <div>
      <main>
        <div className="d-flex flex-wrap">
          {bookings.map((booking) => (
            <div key={booking.id} className="p-3 col-6 container">
              <h2>Name: {booking.name}</h2>
              <p>Email: {booking.email}</p>
              <p>Persons: {booking.persons}</p>
              <p>Message: {booking.message}</p>
              <p>ID: {booking.id}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default OpenBookings;
