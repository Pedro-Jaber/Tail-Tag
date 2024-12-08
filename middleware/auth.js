const jwt = require("jsonwebtoken");
const Pet = require("../model/model_pet");
const e = require("express");

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, _) => {
      if (err) {
        console.error(err.message);
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports.checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.error(err.message);
        req.decodedToken = null;
        res.locals.user = null;
        next();
      } else {
        req.decodedToken = decodedToken;
        res.locals.user = decodedToken;
        next();
      }
    });
  } else {
    res.decodedToken = null;
    res.locals.user = null;
    next();
  }
};

module.exports.checkCollarSerialNumber = async (req, res, next) => {
  const serialNumber = req.body.serialNumber;

  // Check if serial number is provided
  if (!serialNumber) {
    return res.status(400).json({ error: "Missing serial number" });
  }

  const pet = await Pet.findOne({ "collar.serialNumber": serialNumber });

  // Check if pet is found
  if (!pet) {
    return res.status(404).json({ error: "Pet not found" });
  }

  next();
};
