const jwt = require("jsonwebtoken");

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
