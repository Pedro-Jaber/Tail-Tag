// home
module.exports.home_get = (req, res) => {
  res.status(200).render("home");
};

// sign up
module.exports.signup_get = (req, res) => {
  //TODO verify if user is logged in
  res.status(200).render("signup");
};

// login
module.exports.login_get = (req, res) => {
  //TODO verify if user is logged in
  res.status(200).render("login");
};

// admin/login
module.exports.admin_login_get = (req, res) => {
  //TODO verify if user is logged in
  res.status(200).render("login_admin");
};
