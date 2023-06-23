import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/BookApartment.module.css";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function BookApartment(props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [price, setPrice] = useState("");
  const images = [
    props.apartmentImage1,
    props.apartmentImage2,
    props.apartmentImage3,
    props.apartmentImage4,
  ];

  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);

  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const diffInMilliseconds =
      selectedDateRange[0].endDate.getTime() -
      selectedDateRange[0].startDate.getTime();
    const diffInDays = Math.round(diffInMilliseconds / oneDay);
    setPrice(diffInDays * 55);
    console.log("Number of days: " + diffInDays);
    console.log("Price: " + price + "€");
  }, [selectedDateRange]);

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
  const dateRangeRef = useRef();

  const handleDateRangeToggle = () => {
    setIsDateRangeOpen(!isDateRangeOpen);
  };

  const handleClickOutside = (event) => {
    if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
      setIsDateRangeOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contact = {
      name: name,
      persons: persons,
      email: email,
      message: message,
      date: selectedDateRange[0],
    };

    console.log(contact);
    const response = await fetch("/bookApartment", {
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
      alert("Booking of the Apartment succesfull!");
    } else {
      alert("Something went wrong");
    }
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
              <label htmlFor="dateRange" className="form-label">
                <p>Period of Stay</p>
                <input
                  type="text"
                  className="form-control"
                  id="dateRange"
                  onClick={handleDateRangeToggle}
                  value={`${selectedDateRange[0].startDate.toLocaleDateString()} - ${selectedDateRange[0].endDate.toLocaleDateString()}`}
                  readOnly
                />
                {isDateRangeOpen && (
                  <div ref={dateRangeRef}>
                    <DateRangePicker
                      ranges={selectedDateRange}
                      onChange={(ranges) =>
                        setSelectedDateRange([ranges.selection])
                      }
                    />
                  </div>
                )}
              </label>
            </div>

            <div className="mb-3">
              <p>Price</p>
              <p>{price} €</p>
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
