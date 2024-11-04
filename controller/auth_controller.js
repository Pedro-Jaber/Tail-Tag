const User = require("../model/model_user");

// handle errors
const handleErrors = (err) => {
  //console.log(err.message, err.code, err.errors)
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
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
module.exports.login_post = (req, res) => {
  //TODO login user
};

// admin login
module.exports.admin_login_post = (req, res) => {
  //TODO login admin user
};

// log out
module.exports.logout_get = (req, res) => {
  //TODO log out user
};
