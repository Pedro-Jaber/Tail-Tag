//* Dependencies
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

//* Imports
const { connectDB } = require("./model/dataBase");
const publiScapeRouters = require("./routers/public_space_routers");
const userSpaceRouters = require("./routers/user_space_routers");
const collarSpaceRouters = require("./routers/collar_space_routers");
const authRouters = require("./routers/auth_routers");
const {
  requireAuth,
  checkUser,
  checkCollarSerialNumber,
} = require("./middleware/auth");

//* Dotenv
dotenv.config();

//* App
const app = express();
const PORT = process.env.PORT || 5505;

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
app.use("*", checkUser);
app.use(publiScapeRouters);
app.use(authRouters);
app.use("/api", checkCollarSerialNumber, collarSpaceRouters);
app.use("/user", requireAuth, userSpaceRouters);

//* Routes Test ======================
const Pet = require("./model/model_pet");

// Not used
app.get("/map@@", requireAuth, (req, res) => {
  res.status(200).render("map", { L });
});

// Collar test [GET]
app.get("/collar", (req, res) => {
  res.status(200).render("collar");
});

//* ==================================

//* Server Init
//* Connect to DB
connectDB().then((something) => {
  // console.log(something);

  if (something.status === "ERROR") {
    console.log("┌─────────────────────────────┐");
    console.log("│ Server:\x1b[91m Offline \x1b[0m            │");
    console.log(`│ Port: ${PORT}                  │`);
    console.log(`│ link:                       │`);
    console.log("└─────────────────────────────┘");

    if (something.error.errorResponse != undefined) {
      console.log(something.error.errorResponse.errmsg);
    } else {
      console.log(something.error);
    }

    process.exit(1);
  }

  console.log("Database connected");
  console.log(something.conn.connection.host);

  app.listen(PORT, () => {
    console.log("┌─────────────────────────────┐");
    console.log("│ Server:\x1b[92m Online \x1b[0m             │");
    console.log(`│ Port: ${PORT}                  │`);
    console.log(`│ link: http://localhost:${PORT} │`);
    console.log("└─────────────────────────────┘");
  });
});
