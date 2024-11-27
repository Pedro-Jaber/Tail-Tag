const jwt = require("jsonwebtoken");
const Pet = require("../model/model_pet");

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.decodedToken = decodedToken;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.redirect("/login");
    }

    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
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
