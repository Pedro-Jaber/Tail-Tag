const jwt = require("jsonwebtoken");

module.exports.requireAuth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    // console.log(error);
    // res.status(401).json({ error: "Unauthorized" });
    res.redirect("/login");
  }
};
