//TODO change res.status(201).json({ user: user._id }); to flag

const User = require("../model/model_user");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

// handle errors
const handleErrors = (err) => {
  //console.log(err.message, err.code, err.errors)
  let errors = { email: "", password: "", general: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }

  // incorrect credentials
  if (err.message === "incorrect credentials") {
    errors.general = "incorrect credentials";
  }

  // duplicate email error code
  if (err.code == 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors | gets error messages from user model
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const createAccessToken = (id) => {
  //TODO add user roles list
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// sign up
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  //TODO Remove before deployment
  console.log(`User sign up`);
  console.log(req.body);

  try {
    const user = await User.create({ email, password });

    res.status(201).json({ user: user._id });
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

// login
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  //TODO Remove before deployment
  console.log(`User login`);
  console.log(req.body);

  try {
    const user = await User.login(email, password);
    const token = createAccessToken(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// admin login
module.exports.admin_login_post = (req, res) => {
  //TODO login admin user
};

// log out
module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
