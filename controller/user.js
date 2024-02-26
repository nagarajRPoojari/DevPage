const User = require("../module/User");
const passport = require("passport");
module.exports.register = async (req, res) => {
  res.redirect("/auth");
};

module.exports.login = async (req, res) => {
  passport.authenticate("github", { scope: ["user"], prompt: "login" });
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }
    });
  });
  res.redirect("/");
};

module.exports.auth = (req, res, next) => {
  passport.authenticate("github", {
    successRedirect: "/auth/user/profile",
    failureRedirect: "/auth/user/login",
  });
};

module.exports.profile = (req, res, next) => {
  res.json(req.user);
};
