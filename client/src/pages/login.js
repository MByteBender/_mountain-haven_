import BookApartment from "../components/BookApartment";
import Footer from "../components/Footer";

import styles from "../styles/ContactForm.module.css";
import React, { useState } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const contact = {
      id: "cliamev9o000093hcyvs6rwnl",
      username: name,
      password: password,
    };
    console.log(contact);
    const response = await fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    const data = await response.json();
    console.log("LOGIN " + data);
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
                  id="name"
                  value={name}
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

export default Login;
