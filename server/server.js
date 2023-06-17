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
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");

const jwt = require("jsonwebtoken");

const { authenticateToken } = require("./middleware");

const initializePassport = require("./passport-config");

// initializePassport(passport, (email) =>
//   prisma.user.findUnique({
//     where: { email: email },
//   })
// );

// const user = await prisma.user.findUnique({
//   where: { id: req.body.id },
// });
// !add this lines again when building npm run buil for deploy
// app.use(express.static(path.join(__dirname, "../client/build")));

app.use(express.json());

// app.use(passport.initialize()); // is a function inside passport that setsup basic stuff for us
// app.use(passport.session()); //store variables across the whole session the user has

// !Has to be changed for authentification
// app.get("/protected", authenticateToken, (req, res) => {
//   // This route is only accessible to authenticated users
//   // ...
// });

// enpoint which creates a user and hashes the password and stores the hashed passowrd in the database
app.post("/register", async (req, res) => {
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
    // Generate a JWT
    const token = jwt.sign({ userId: user.id }, process.env.SESSION_SECRET, {
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

app.get("/bookApartment", async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const bookings = await prisma.booking.findMany();

  console.log(bookings);
  res.json(bookings);
});

app.delete("/bookApartment/:id", async (req, res) => {
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

// // !endcomment when depolying
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/../client/build/index.html"));
// });

const port = process.env.PORT || 3000;
console.log(`Server now listens on Port: ${port}`);
app.listen(port);
