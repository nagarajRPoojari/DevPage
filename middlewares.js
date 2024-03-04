const ExpressError = require("./utilities/ExpressError");
const Blog = require("./module/Blog");
const User = require("./module/User");
module.exports.isloggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/");
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog.author.equals(req.user._id)) {
    return res.redirect(`/Blogs/${id}`);
  }
  next();
};

module.exports.isFollowing = async (req, res, next) => {
  const userId = req.user._id;
  const following = req.params.id;
  const user = await User.findById(userId);
  const followings = user.following;
  if (followings.includes(following)) {
    res.redirect(`/auth/user/public/${following}`);
  } else next();
};

module.exports.isNotFollowing = async (req, res, next) => {
  const userId = req.user._id;
  const following = req.params.id;
  const user = await User.findById(userId);
  const followings = user.following;
  if (followings.includes(following)) {
    next();
  } else res.redirect(`/auth/user/public/${following}`);
};

module.exports.isEmailVerified = async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (user.email_verified == "verified") res.redirect("/auth/user/profile");
  else next();
};
