const ExpressError = require("./utilities/ExpressError");
const Blog = require("./module/Blog");
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
