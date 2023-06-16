import React, { useState, useEffect } from "react";
import styles from "../styles/BookApartment.module.css";

function BookApartment(props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    props.apartmentImage1,
    props.apartmentImage2,
    props.apartmentImage3,
    props.apartmentImage4,
  ]; // Replace with your image URLs

  useEffect(() => {
    const updateImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const timer = setTimeout(updateImage, 5000);

    return () => clearTimeout(timer);
  }, [currentImageIndex, images.length]);

  const [name, setName] = useState("");
  const [persons, setPersons] = useState(1);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    console.log("Name:", name);
    console.log("Persons:", persons);
    console.log("Email:", email);
    console.log("Message:", message);
  };

  return (
    <div className="container-fluid pt-4 pb-4">
      <div className="row">
        <div className="ps-0 col">
          <div className={`position-relative ${styles.apartmentContainer}`}>
            {images.map((image, index) => (
              <img
                key={index}
                className={`img-fluid ${styles.apartmentImage} ${
                  currentImageIndex === index ? styles.active : styles.hidden
                }`}
                src={image}
                alt={`Apartment ${index + 1}`}
                style={{ transition: "opacity 0.5s ease" }}
              />
            ))}
            <h1
              className={`position-absolute top-50 start-50 translate-middle ${styles.apartmentText}`}
            >
              Book ME
            </h1>
          </div>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit} className="w-100 p-2">
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
              <label htmlFor="persons" className="form-label">
                Number of Persons
              </label>
              <input
                type="number"
                className="form-control"
                id="persons"
                value={persons}
                onChange={(e) => setPersons(parseInt(e.target.value))}
                min="1"
                max={props.maxGuestNumber}
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
              <span>Submit</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookApartment;
