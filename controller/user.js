const User = require("../module/User");
const passport = require("passport");

module.exports.renderAuth = async (req, res) => {
  res.render("user/login");
};

module.exports.register = async (req, res) => {
  passport.authenticate("github", { scope: ["user"], prompt: "login" });
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
    successRedirect: "/blogs",
    failureRedirect: "/auth/user/login",
  });
};
module.exports.profile = (req, res, next) => {
  res.json(req.user);
};

module.exports.user = async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) res;
};
