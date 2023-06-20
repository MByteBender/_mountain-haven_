import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AdminNavbar from "../components/NavbarAdmin";

function AdminOpenBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getBookings() {
      const token = Cookies.get("token"); // Retrieve the token from the cookie
      if (!token) {
        navigate("/");
        return;
      }
      const response = await fetch("/bookApartment", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // includes the token in the Authorization heade
        },
      });

      const data = await response.json();
      setBookings(data);
    }

    getBookings();
  }, []);

  async function deleteBooking(id) {
    const token = Cookies.get("token");
    try {
      const response = await fetch(`/bookApartment/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // includes the token in the Authorization header
        },
      });

      if (response.ok) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== id)
        );
      } else {
        throw new Error("Failed to delete booking");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function sendConfirmationEmail(booking) {
    try {
      const response = await fetch("/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: booking.email,
          subject: "Booking Confirmation",
          text: `Dear ${booking.name}, your booking has been confirmed!`,
        }),
      });

      if (response.ok) {
        console.log("Email sent");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error(error);
    }
  }

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
              <button className="btn btn-primary">Edit</button>
              <button
                onClick={() => deleteBooking(booking.id)}
                className="btn btn-primary ms-2"
              >
                Delete
              </button>
              <button
                onClick={() => sendConfirmationEmail(booking)}
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
}

export default AdminOpenBookings;
