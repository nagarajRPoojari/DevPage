const User = require("../module/User");
const passport = require("passport");
const Blog = require("../module/Blog");

module.exports.allblogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const blogs = await Blog.find({})
      .populate("author")
      .skip(skip)
      .limit(limit);
    const totalBlogsCount = await Blog.countDocuments();
    const totalPages = Math.ceil(totalBlogsCount / limit);

    res.render("blogs/home", {
      blogs,
      currentUser: req.user,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//create
//edit
//delete
//show

module.exports.show = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id).populate("author");
  res.render("blogs/show", { blog: blog });
};
