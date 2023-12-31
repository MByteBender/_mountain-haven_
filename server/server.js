const YELP_API_TOKEN =
  "GJdtdQ6yNtMxK8S3QF_RUQ5PKqgoeKN0B9A8-xclmQv-ks5XeGu7D8pUC_GcpP1dpnfE8Kmjm9Vvn7wTs6D8INlQVIbQL6FrT5qYF3cILfykBCBGdKyL1OcX14yQZHYx";
const SESSION_SECRET = "secret";
const ADMIN_SECRET = "admin";
const PORT = 3000;

const express = require("express");

const path = require("path");
const app = express();
const prisma = require("./lib/prisma");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const {
  authenticateToken,
  authenticateTokenAdmin,
  sendResponse,
  validateEmail,
} = require("./middleware");
const { send } = require("process");

// !add this lines again when building npm run buil for deploy
// app.use(express.static(path.join(__dirname, "../client/build")));

app.use(express.json());

// enpoint which creates a user and hashes the password and stores the hashed passowrd in the database
app.post("/user/register", validateEmail, async (req, res) => {
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

    const token = jwt.sign(
      { email: user.email }, //put the email in the token payload
      SESSION_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).send({ token: token, message: "Successfully registered!" });
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
    console.log("user null");
    return res.sendStatus(400);
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      // Generate a JWT and sign it
      const token = jwt.sign(
        { email: user.email }, //put the email in the token payload
        SESSION_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.json({ token, message: "Succes" });
    } else {
      console.log("something went wrong");
      res.status(401).send({ message: "Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

app.get(
  "/openBookings",
  authenticateToken,
  async (req, res, next) => {
    const email = req.user.email; //req user is the payload of the token
    const bookings = await prisma.booking.findMany({
      where: { email: email },
    });

    console.log(bookings);
    res.data = bookings;
    next();
  },
  sendResponse
);

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
    const token = jwt.sign({ userId: user.id }, ADMIN_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, message: "Succes" });
  } else {
    res.status(401).send({ message: "Denied" });
  }
});

app.post("/bookApartment", validateEmail, async (req, res) => {
  const contactData = req.body;
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };

  const startDate = new Date(req.body.date.startDate);
  const formattedStartDate = startDate.toLocaleDateString("en-GB", options);
  const endDate = new Date(req.body.date.endDate);
  const formattedEndDate = endDate.toLocaleDateString("en-GB", options);

  delete contactData.date;
  contactData.startDate = formattedStartDate;
  contactData.endDate = formattedEndDate;

  console.log("Date " + formattedStartDate);
  console.log("Date " + formattedEndDate);
  console.log("Contact data: " + JSON.stringify(req.body));
  try {
    const savedContact = await prisma.booking.create({
      data: contactData,
    });
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.put(
  "/bookApartment/status/:id",
  authenticateTokenAdmin,
  async (req, res) => {
    try {
      const id = req.params.id;

      await prisma.booking.update({
        where: { id: id },
        data: { status: "Confirmed" },
      });

      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
);

app.get(
  "/bookApartment",
  authenticateTokenAdmin,
  async (req, res, next) => {
    try {
      const bookings = await prisma.booking.findMany();
      res.data = bookings;
      next();
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  },
  sendResponse
);

app.delete("/bookApartment/:id", authenticateTokenAdmin, async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBooking = await prisma.booking.delete({
      where: {
        id: id,
      },
    });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// !NO API KEY
/* 
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
    res.sendStatus(500);
  }
});
*/

app.post("/blogs", authenticateToken, async (req, res) => {
  console.log(req.user.email); //req user is the payload of the token
  const userData = {
    email: req.user.email, //req user is the payload of the token
    title: req.body.title,
    blogPost: req.body.blogPost,
  };

  console.log("Test TITLE: " + userData.title);

  try {
    if (
      userData.title == null ||
      userData.title == undefined ||
      userData.title === ""
    ) {
      throw new Error("title empty");
    }

    await prisma.blogs.create({
      data: userData,
    });
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.get(
  "/blogs",
  async (req, res, next) => {
    try {
      const blogPosts = await prisma.blogs.findMany();
      res.data = blogPosts;
      next();
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  },
  sendResponse
);

// endpoint used to edit a existing Blogpost of a user
app.patch("/blogs", authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;

    const { title, blogPost } = req.body;

    await prisma.blogs.update({
      where: { email: email },
      data: { title: title, blogPost: blogPost },
    });

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.get(
  "/contact",
  authenticateTokenAdmin,
  async (req, res, next) => {
    try {
      const contactRequest = await prisma.contact.findMany();
      console.log(contactRequest);
      res.data = contactRequest;
      next();
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  },
  sendResponse
);

app.post("/contact", validateEmail, async (req, res) => {
  try {
    await prisma.contact.create({
      data: req.body,
    });
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.delete("/contact/:id", authenticateTokenAdmin, async (req, res) => {
  const id = req.params.id;

  try {
    const deletedContactRequest = await prisma.contact.delete({
      where: {
        id: id,
      },
    });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get(
  "/restaurants",
  async (req, res, next) => {
    const latitude = "47.040286";
    const longitude = "10.600489";
    const data = await fetch(
      `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${YELP_API_TOKEN}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      })
      .then((data) => {
        res.data = data;
        next();
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  },
  sendResponse
);

// !endcomment when depolying
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/../client/build/index.html"));
// });

console.log(`Server now listens on Port: ${PORT}`);
app.listen(PORT);
