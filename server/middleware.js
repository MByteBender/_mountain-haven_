const jwt = require("jsonwebtoken");
const xmlBuilder = require("xmlbuilder2");

const SESSION_SECRET = "secret";
const ADMIN_SECRET = "admin";

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("token: " + token);

  if (!token) {
    return res.status(401).send("No token provided");
  }

  jwt.verify(token, SESSION_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }

    req.user = user;
    next();
  });
};

const authenticateTokenAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("No token provided");
  }

  jwt.verify(token, ADMIN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }

    req.user = user;
    next();
  });
};

const sendResponse = (req, res) => {
  if (req.get("Accept") === "application/json" || req.get("Accept") === "*/*") {
    res.json(res.data);
  } else if (req.get("Accept") === "application/xml") {
    const xmlData = xmlBuilder
      .create({ root: { items: res.data } })
      .end({ prettyPrint: true });
    res.type("application/xml");
    res.send(xmlData);
  }
};

const validateEmail = (req, res, next) => {
  const email = req.body.email;
  //defining a regex indicating with / ^indicates start of string and $ end of string
  const emailRegex = /^[^\s@]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/;
  console.log("Mail regex: " + email);
  if (!emailRegex.test(email)) {
    console.log("wrong mail");
    return res.status(400).json({ error: "Invalid email" });
  }

  next();
};

module.exports = {
  authenticateToken,
  authenticateTokenAdmin,
  sendResponse,
  validateEmail,
};
