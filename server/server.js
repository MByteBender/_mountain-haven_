const express = require("express");
const path = require("path");
const app = express();
const prisma = require("./lib/prisma");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// add this lines again when building npm run buil for deploy
// app.use(express.static(path.join(__dirname, "../client/build")));

app.use(express.json());

const users = [
  {
    name: "Tristan",
    password: "pass",
  },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  // Authenticate User

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log("salt " + salt);
    console.log("hashed password " + hashedPassword);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  // Authenticate User
  const user = users.find((user) => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
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

// endcomment when depolying
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/../client/build/index.html"));
// });

const port = process.env.PORT || 3000;
console.log(`Server now listens on Port: ${port}`);
app.listen(port);
