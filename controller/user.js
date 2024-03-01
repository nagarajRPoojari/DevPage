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
  res.redirect("/blogs");
};
module.exports.auth = (req, res, next) => {
  passport.authenticate("github", {
    successRedirect: "/blogs",
    failureRedirect: "/auth/user/login",
  });
};
module.exports.profile = async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  res.render("user/profile.ejs", { user: user });
};

module.exports.user = async (req, res, next) => {
  const userId = req.params.id;
  if (req.user._id == userId) res.redirect("/auth/user/profile");
  const user = await User.findById(userId);
  res.render("user/user.ejs", { user: user });
};

module.exports.updateProfile = async (req, res) => {
  const data = req.body;
  const id = req.user._id;
  const user = await User.updateMany(
    { _id: id },
    {
      first_name: data.inputFirstName,
      last_name: data.inputLastName,
      education: data.inputEducation,
      address: data.inputAddress,
      country: data.inputCountry,
      company: data.inputCompany,
      job: data.inputJob,
      email: data.inputEmail,
      social_media_urls: [
        data.inputYoutube,
        data.inputX,
        data.inputFacebook,
        data.inputLinkedIn,
      ],
      phone: data.inputPhone,
      about: data.inputAbout,
      skills: data.inputSkills.split(","),
    }
  );

  res.redirect("/auth/user/profile");
};
