import React, { useEffect, useState } from "react";
import BasicSlider from "../components/HeroSlider/BasicSlider";
import styles from "../styles/BlogPost.module.css";
import customButton from "../styles/customButton.module.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const BlogsTest = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getBlogPosts() {
      try {
        const response = await fetch("/blogs", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received data:", data);
        setBlogs(data);
      } catch (error) {
        console.log("An error occurred while fetching blogs:", error);
      }
    }

    getBlogPosts();
  }, []);

  return (
    <div>
      <main>
        <div className="d-flex flex-wrap">
          {blogs.map((booking) => (
            <div key={booking.id} className="p-3 col-6 container">
              <h2>Name: {booking.title}</h2>
              <p>Email: {booking.blogPost}</p>
              <p>Persons: {booking.persons}</p>
              <p>Message: {booking.message}</p>
              <p>Status: {booking.status}</p>
              <p>id {booking.id}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogsTest;
