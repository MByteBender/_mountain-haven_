const express = require("express");
const path = require("path");
const app = express();

// add this lines again when building npm run buil for deploy
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/contact", (req, res) => {
  console.log("ANFRAGE");
  res.send("HALLO");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

const port = process.env.PORT || 3000;
console.log(`Server now listens on Port: ${port}`);
app.listen(port);
