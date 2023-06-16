import styles from "../styles/ContactForm.module.css";
import React, { useState } from "react";

const axios = require("axios");

// async function saveContact(contact) {
//   const response = fetch("/contact", {
//     method: "GET",
//   });
//   console.log(response);
//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }
// }

function CreateUserForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted!");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    // saves the contact from the form to the database
    const contact = { name: name, email: email, message: message };
    console.log(contact);
    const response = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    const data = await response.json();
    console.log("Response: " + Object.values(data));
  };

  return (
    <div
      className={`container d-flex align-items-center justify-content-center ${styles.outerContainer}`}
    >
      <div className={`col-md-6 bg ${styles.innerContainer}`}>
        <h1 className="text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="message"
              rows="5"
              value={message}
              onChange={(e) => setPassword(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className={` ${styles.customButton}`}>
            <span>Sumbit</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUserForm;
