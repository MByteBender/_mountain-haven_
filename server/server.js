// load enviroment variabels so when we are in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config;
}

const express = require("express");

const path = require("path");
const app = express();
const prisma = require("./lib/prisma");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { authenticateToken, authenticateTokenAdmin } = require("./middleware");
const { send } = require("process");

// !add this lines again when building npm run buil for deploy
// app.use(express.static(path.join(__dirname, "../client/build")));

app.use(express.json());

// enpoint which creates a user and hashes the password and stores the hashed passowrd in the database
app.post("/user/register", async (req, res) => {
  // Authenticate User

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log("salt " + salt);
    console.log("hashed password " + hashedPassword);
    const user = { email: req.body.email, password: hashedPassword };

    const savedContact = await prisma.users.create({
      data: user,
    });
    res.status(201).send({ message: "Successfully registered" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Email already exists" }); // if user with that mail already exists return status 500
  }
});

app.post("/user/login", async (req, res) => {
  // Authenticate User
  const user = await prisma.users.findUnique({
    where: { email: req.body.email },
  });

  if (user == null) {
    return res.status(400).send("Cannot find user");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      // Generate a JWT and sign it
      const token = jwt.sign(
        { email: user.email }, //put the email in the token payload
        process.env.SESSION_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.json({ token, message: "Succes" });
    } else {
      res.status(401).send({ message: "Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

app.get("/openBookings", authenticateToken, async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const email = req.user.email; //req user is the payload of the token
  const bookings = await prisma.booking.findMany({
    where: { email: email },
  });

  console.log(bookings);
  res.json(bookings);
});

app.post("/admin/login", async (req, res) => {
  // Authenticate User
  const user = await prisma.admin.findUnique({
    where: { username: req.body.username },
  });

  if (user == null) {
    return res.status(400).send({ message: "Denied" });
  }

  if (
    user.password === req.body.password &&
    user.username === req.body.username
  ) {
    // Generate a JWT and sign it
    const token = jwt.sign({ userId: user.id }, process.env.ADMIN_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, message: "Succes" });
  } else {
    res.status(401).send({ message: "Denied" });
  }
});

app.post("/bookApartment", async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const contactData = req.body;

  console.log("Contact data: " + JSON.stringify(req.body));
  const savedContact = await prisma.booking.create({
    data: contactData,
  });
  res.send(savedContact);
});

app.get("/bookApartment", authenticateTokenAdmin, async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const bookings = await prisma.booking.findMany();

  console.log(bookings);
  res.json(bookings);
});

app.delete("/bookApartment/:id", authenticateTokenAdmin, async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBooking = await prisma.booking.delete({
      where: {
        id: id,
      },
    });

    res.json(deletedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/sendEmail", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    // Create a transporter object using the Gmail SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "mountainhaven10@gmail.com",
        pass: "dAt5LpDmQyAd66PA&K#T",
      },
    });

    // Send the email using the transporter object
    let info = await transporter.sendMail({
      from: '"Mountain Haven" <mountainhaven10@gmail.com>',
      to,
      subject,
      text,
    });

    res.json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/blogs/post", authenticateToken, async (req, res) => {
  console.log(req.user.email); //req user is the payload of the token
  const userData = {
    email: req.user.email, //req user is the payload of the token
    title: req.body.title,
    blogPost: req.body.blogPost,
  };
  try {
    await prisma.blogs.create({
      data: userData,
      // email: req.user.email,
      // title: req.body.title,
      // blogPost: req.body.blogPost,
    });
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.get("/blogs", async (req, res) => {
  const blogPosts = await prisma.blogs.findMany();

  if (blogPosts.length > 0) {
    const response = blogPosts.map((post) => ({
      //map the response array so that only title and blogpost are sent to the client
      title: post.title,
      blogPost: post.blogPost,
    }));

    res.json(response);
  } else {
    res.sendStatus(500);
  }
});

// // !endcomment when depolying
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/../client/build/index.html"));
// });

const port = process.env.PORT || 3000;
console.log(`Server now listens on Port: ${port}`);
app.listen(port);
