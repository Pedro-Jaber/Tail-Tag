//* Dependencies
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");

//* Imports

//* Dotenv
dotenv.config();

//* Connect to DB

//* App
const app = express();
const PORT = 5505; //TODO make as env variable

//* Public
app.use(express.static("public"));

//* EJS Config
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layouts", "layouts/main");

//* Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//* Routes
app.get(["/", "home"], (req, res) => {
  res.status(200).send("Hello, World!");
});

//* Server Init
//TODO connect to database before start
app.listen(PORT, () => {
  console.log("Server:\x1b[92m Online \x1b[0m");
  console.log("Port: " + PORT);
  console.log(`link: http://localhost:${PORT}`);
  console.log("->");
});
