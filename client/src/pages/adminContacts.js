import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AdminNavbar from "../components/NavbarAdmin";
import Footer from "../components/Footer";

function AdminContacts() {
  const [contactRequest, setContactRequest] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    async function getContactRequest() {
      const token = Cookies.get("token"); // Retrieve the token from the cookie
      if (!token) {
        alert("You are not loged in!");
        return;
      }
      const response = await fetch("/contact", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // includes the token in the Authorization header
        },
      });

      const data = await response.json();
      setContactRequest(data);
    }

    getContactRequest();
  }, []);

  async function deleteContactRequest(id) {
    const token = Cookies.get("token");
    try {
      const response = await fetch(`/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // includes the token in the Authorization header
        },
      });

      if (response.ok) {
        setContactRequest((prevContactRequest) =>
          prevContactRequest.filter(
            (contactRequest) => contactRequest.id !== id
          )
        );
      } else {
        throw new Error("Failed to delete booking");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <main>
        <div className="d-flex flex-wrap">
          {contactRequest.map((contactRequest) => (
            <div key={contactRequest.id} className="p-3 col-6 container">
              <h2>Name: {contactRequest.name}</h2>
              <p>Email: {contactRequest.email}</p>
              <p>Message: {contactRequest.message}</p>
              <p>ID: {contactRequest.id}</p>
              <button className="btn btn-primary">Edit</button>
              <button
                onClick={() => deleteContactRequest(contactRequest.id)}
                className="btn btn-primary ms-2"
              >
                Delete
              </button>
              <button className="btn btn-primary ms-2">answer</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AdminContacts;
