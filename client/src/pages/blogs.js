import React, { useEffect, useState } from "react";
import BookApartment from "../components/BookApartment";
import Footer from "../components/Footer";
import BasicSlider from "../components/HeroSlider/BasicSlider";
import styles from "../styles/BlogPost.module.css";
import customButton from "../styles/customButton.module.css";
import Cookies from "js-cookie";

const Blogs = () => {
  const [title, setTitle] = useState("");
  const [blogPostClient, setBlogPostClient] = useState("");
  const [blogPost, setBlogPost] = useState([]);

  useEffect(() => {
    async function getBlogPosts() {
      const response = await fetch("/blogs", {
        method: "GET",
      });

      const data = await response.json();
      setBlogPost(data);
    }

    getBlogPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { title: title, blogPost: blogPostClient };
    const token = Cookies.get("token");

    const response = await fetch("/blogs/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // includes the token in the Authorization header
      },
      body: JSON.stringify(requestBody),
    });

    // add resposne 403 when your cookie is invalid
    if (!token || response.status() == 403) {
      alert("you can only write a Blog-Post if you are logged in!");
      return;
    }

    if (response.status == 500) {
      alert("You already Postet a Blog-Post");
    }
  };
  return (
    <div>
      <main>
        <BasicSlider
          Title="Blogs"
          Apartmentdescription="Write your experiences"
        />
        <div className="d-flex flex-wrap">
          {blogPost.map((blogPost) => (
            <div className="p-3 col-6 container">
              <h2>Title: {blogPost.title}</h2>
              <p>Blog-Post: {blogPost.blogPost}</p>
            </div>
          ))}
        </div>

        <div
          className={`container d-flex align-items-center justify-content-center ${styles.outerContainer}`}
        >
          <div className={`col-md-6 bg ${styles.innerContainer}`}>
            <h1 className="text-center">Write one yourself</h1>
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
                <label htmlFor="blogPostClient" className="form-label">
                  Blog-Post
                </label>
                <textarea
                  className="form-control"
                  id="blogPostCLient"
                  rows="5"
                  maxLength={250}
                  value={blogPostClient}
                  onChange={(e) => setBlogPostClient(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className={` ${customButton.customButton}`}>
                <span>Post</span>
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
