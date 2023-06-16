import BookApartment from "../components/BookApartment";
import Footer from "../components/Footer";

import styles from "../styles/ContactForm.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const contact = {
      username: username,
      password: password,
    };
    console.log(contact);
    const response = await fetch("/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    const data = await response.json();

    if (data.message === "Succes") {
      // Store the token in local storage
      localStorage.setItem("token", data.token);
      navigate("/admin");
    } else if (data.message === "Denied") {
      alert("Wrong username or password");
    }
    console.log("LOGIN " + response);
    console.log("Response: " + Object.values(data));
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
                <label htmlFor="name" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
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
                <span>Login</span>
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default AdminLogin;
