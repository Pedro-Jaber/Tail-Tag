//* Dependencies
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

//* Imports
const { connectDB } = require("./model/dataBase");
const publiScapeRouters = require("./routers/public_space_routers");
const authRouters = require("./routers/auth_routers");
const { requireAuth } = require("./middleware/auth");

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
app.use(cookieParser());

//* Routes
app.use(publiScapeRouters);
app.use(authRouters);
//app.use(userSpaceRouters);

//* Routes Test ======================
const Pet = require("./model/model_pet");

app.get("/map", requireAuth, (req, res) => {
  const L = null; //require("leaflet");

  res.status(200).render("map", { L });
});

app.post("/pet-position", async (req, res) => {
  const incomeUrl = req.body.incomeUrl;
  const id = req.body.id;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  console.log(req.body);

  // Save image and information on data database
  try {
    await Pet.updateOne(
      {
        _id: id,
      },
      {
        $push: { latitude: latitude, longitude: longitude },
      }
    ).then(() => {
      //* Status 200 Updated
      res.status(200).redirect(incomeUrl);
    });
  } catch (error) {
    console.log(error);
    //* Status 500 Internal Server Error
    res.status(500).send("500 Internal Server Error");
  }

  //TODO Status 400 Bad Request //error in information
  //res.status(400).send("400 Bad Request");
});

app.get("/pet-position/:id", async (req, res) => {
  const data = await Pet.findById(req.params.id, {
    latitude: { $slice: -10 },
    longitude: { $slice: -10 },
  });

  res.status(200).json(data);
});

app.get("/pet-position-forms", (req, res) => {
  res.status(200).render("pet_postion_forms");
});
//* ==================================

//* Server Init
//TODO connect to database before start
app.listen(PORT, () => {
  console.log("┌─────────────────────────────┐");
  console.log("│ Server:\x1b[92m Online \x1b[0m             │");
  console.log(`│ Port: ${PORT}                  │`);
  console.log(`│ link: http://localhost:${PORT} │`);
  console.log("└─────────────────────────────┘");
});
