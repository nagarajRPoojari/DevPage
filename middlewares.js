const ExpressError = require("./utilities/ExpressError");

module.exports.isloggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/");
  }
  next();
};
