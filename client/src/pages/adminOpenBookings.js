import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AdminOpenBookings() {
  const [bookings, setBookings] = useState([]);
  const [confirmationStatus, setConfirmationStatus] = useState(false); // State variable for confirmation status

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
  }, [confirmationStatus, navigate]);

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

  async function confirmBooking(bookingID) {
    const token = Cookies.get("token");

    try {
      const response = await fetch(`/bookApartment/status/${bookingID}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setConfirmationStatus(!confirmationStatus);
        alert("Confirmation sent");
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
              <p>Apartment: {booking.apartment}</p>
              <p>Email: {booking.email}</p>
              <p>Persons: {booking.persons}</p>
              <p>Message: {booking.message}</p>
              <p>Status: {booking.status}</p>
              <p>Start-Date: {booking.startDate}</p>
              <p>End-Date: {booking.endDate}</p>
              <p>ID: {booking.id}</p>
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
}

export default AdminOpenBookings;
