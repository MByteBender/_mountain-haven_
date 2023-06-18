import React, { useState } from "react";
import BookApartment from "../components/BookApartment";
import Footer from "../components/Footer";
import BasicSlider from "../components/HeroSlider/BasicSlider";
import styles from "../styles/BlogPost.module.css";
import customButton from "../styles/customButton.module.css";

const Blogs = () => {
  const [title, setTitle] = useState("");
  const [blogPost, setBlogPost] = useState("");

  const handleSubmit = async (e) => {

    

  };
  return (
    <div>
      <main>
        <BasicSlider
          Title="Blogs"
          Apartmentdescription="Write your experiences"
        />
        <div
          className={`container d-flex align-items-center justify-content-center ${styles.outerContainer}`}
        >
          <div className={`col-md-6 bg ${styles.innerContainer}`}>
            <h1 className="text-center">Contact</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="blogPost" className="form-label">
                  Blog-Post
                </label>
                <textarea
                  className="form-control"
                  id="blogPost"
                  rows="5"
                  maxLength={250}
                  value={blogPost}
                  onChange={(e) => setBlogPost(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className={` ${customButton.customButton}`}>
                <span>Sumbit</span>
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Blogs;
