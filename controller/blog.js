const Blog = require("../module/Blog");
const markdown = require("markdown-it")();
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

module.exports.renderCreate = async (req, res) => {
  var convertedMarkdown;
  res.render("blogs/create", { convertedMarkdown });
};

module.exports.create = async (req, res) => {
  try {
    const categories = req.body.categories.split(",");
    const blog = await Blog.insertMany({
      author: req.user,
      title: req.body.title,
      text: req.body.text,
      description: req.body.description,
      categories: categories,
    });
    const blogId = blog[0]._id;

    res.redirect(`/blogs/${blogId}`);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Error creating blog");
  }
};

//edit
//delete
//show

module.exports.show = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id)
    .populate("author")
    .populate({
      path: "reviews",
      populate: { path: "author" },
    });
  res.render("blogs/show", { blog: blog });
};
