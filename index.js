//* Dependencies
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");

//* Imports
const { connectDB } = require("./model/dataBase");
const Pet = require("./model/model_pet");

//* Dotenv
dotenv.config();

//* Connect to DB
connectDB();

//* App
const app = express();
const PORT = 5505; //TODO make as env variable

//* Public
app.use(express.static("public"));

//* EJS Config
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "layouts/main");

//* Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//* Routes
app.get(["/", "/home"], (req, res) => {
  res.status(200).render("home");
});

app.get("/map", (req, res) => {
  const L = null; //require("leaflet");

  res.status(200).render("map", { L });
});

app.post("/map-post", (req, res) => {});

app.get("/pet-position", (req, res) => {
  res.status(200).json({
    lat: "-15.80531734672924",
    lgn: "-47.951357575312976",
  });
});

app.get("/test", async (req, res) => {
  const data = await Pet.find();
  console.log(data[0]);
});

//* Server Init
//TODO connect to database before start
app.listen(PORT, () => {
  console.log("┌─────────────────────────────┐");
  console.log("│ Server:\x1b[92m Online \x1b[0m             │");
  console.log(`│ Port: ${PORT}                  │`);
  console.log(`│ link: http://localhost:${PORT} │`);
  console.log("└─────────────────────────────┘");
});
