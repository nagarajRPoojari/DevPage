const ExpressError = require("./utilities/ExpressError");

module.exports.isloggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Sign in first");
    return res.redirect("/login");
  }
  next();
};
