const jwt = require("jsonwebtoken");
const xmlBuilder = require("xmlbuilder2");

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("token: " + token);

  if (!token) {
    return res.status(401).send("No token provided");
  }

  jwt.verify(token, process.env.SESSION_SECRET, (err, user) => {
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

  jwt.verify(token, process.env.ADMIN_SECRET, (err, user) => {
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

module.exports = {
  authenticateToken,
  authenticateTokenAdmin,
  sendResponse,
};
