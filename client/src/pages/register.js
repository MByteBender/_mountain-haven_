import BookApartment from "../components/BookApartment";
import Footer from "../components/Footer";

import styles from "../styles/ContactForm.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const contact = {
    email: email,
    password: password,
  };

  const login = async (e) => {
    const response = await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    const data = await response.json();

    if (response.status === 200) {
      Cookies.set("token", data.token);
      alert("login Succesfull");
      navigate("/openBookings"); // return to home when successfully registred
    } else if (response.status === 401 || response.status === 500) {
      // Read the response body as JSON
      alert("Wrong username or Password!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here

    console.log(contact);
    const response = await fetch("/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    const responseData = await response.json();

    if (response.status === 201) {
      alert(Object.values(responseData));
      navigate("/"); // return to home when successfully registred
    } else if (response.status === 500) {
      // Read the response body as JSON
      alert(Object.values(responseData));
    }
  };

  return (
    <div>
      <main>
        <div
          className={`container d-flex align-items-center justify-content-center ${styles.outerContainer}`}
        >
          <div className={`col-md-6 bg ${styles.innerContainer}`}>
            <h1 className="text-center">Login</h1>
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
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className={` ${styles.customButton}`}>
                <span>Register</span>
              </button>
            </form>
            <button onClick={login} className={` ${styles.customButton}`}>
              <span>Login</span>
            </button>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Register;
