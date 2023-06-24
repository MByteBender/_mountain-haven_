import styles from "../styles/ContactForm.module.css";
import React, { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents default form behavoir f.e. side refresh

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

    if (response.status === 201) {
      setEmail("");
      setMessage("");
      setName("");
      alert("Form Succesfully submited");
    } else alert("Something went wrong");
  };

  return (
    <div
      className={`container d-flex align-items-center justify-content-center ${styles.outerContainer}`}
    >
      <div className={`col-md-6 bg ${styles.innerContainer}`}>
        <h1 className="text-center">Contact</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              onChange={(e) => setMessage(e.target.value)}
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

export default ContactForm;
