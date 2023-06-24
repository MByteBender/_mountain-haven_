const readline = require("readline");

async function getBlogPosts() {
  try {
    const response = await fetch("http://localhost:3000/blogs", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    const blogs = await response.json();
    console.log(blogs);
    console.log("Status Blogs " + response.status);
  } catch (error) {
    console.error(error);
  }
}

async function getRestaurants() {
  try {
    const response = await fetch("http://localhost:3000/restaurants", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    const blogs = await response.json();
    console.log(blogs);
    console.log("Status getRestaurants " + response.status);
  } catch (error) {
    console.error(error);
  }
}

async function postContactRequest() {
  try {
    const scanner = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const name = await new Promise((resolve) => {
      scanner.question("Name: ", (input) => {
        resolve(input);
      });
    });
    const email = await new Promise((resolve) => {
      scanner.question("Email: ", (input) => {
        resolve(input);
      });
    });
    const message = await new Promise((resolve) => {
      scanner.question("Message: ", (input) => {
        resolve(input);
      });
    });

    scanner.close();
    const contact = { name, email, message };
    console.log(contact);

    const response = await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    console.log("Status PostContact " + response.status);
  } catch (error) {
    console.error(error);
  }
}

// ! Uncomment method to show api repsone in console
// postContactRequest();
// getBlogPosts();
// getRestaurants();
