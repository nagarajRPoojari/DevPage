const Blog = require("../module/Blog");
const { s3 } = require("../aws-config");
const { v4: uuid } = require("uuid");
const ExpressError = require("../utilities/ExpressError");
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

    const urls = [];
    const bucket = process.env.AWS_S3_PROCESSED_BUCKET;
    const region = process.env.AWS_S3_REGION;
    for (let i = 0; i < blogs.length; i++) {
      const key = blogs[i].image;
      const objectUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
      urls.push(objectUrl);
    }
    res.render("blogs/home", {
      blogs,
      currentUser: req.user,
      totalPages,
      currentPage: page,
      urls: urls,
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
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const fileId = uuid() + "." + req.file.originalname.split(".").pop();
    const params = {
      Bucket: process.env.AWS_S3_RAW_BUCKET,
      Key: fileId,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    s3.upload(params, async (err, data) => {
      if (err) {
        return res.status(500).send("Error uploading image to S3.");
      }

      const categories = req.body.categories.split(",");
      const blog = await Blog.insertMany({
        author: req.user,
        title: req.body.title,
        text: req.body.text,
        description: req.body.description,
        categories: categories,
        image: fileId,
      });

      const blogId = blog[0]._id;
      res.redirect(`/blogs/${blogId}`);
    });
  } catch (error) {
    res.status(500).send("Error creating blog");
  }
};
//edit
module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Blog.findById(id).populate("reviews");
  await Blog.findByIdAndDelete(id);
  res.redirect("/blogs");
};

module.exports.show = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id)
      .populate("author")
      .populate({
        path: "reviews",
        populate: { path: "author" },
      });
    const bucket = process.env.AWS_S3_PROCESSED_BUCKET;
    const key = blog.image;
    const region = process.env.AWS_S3_REGION;
    const objectUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
    res.render("blogs/show", { blog: blog, objectUrl: objectUrl });
  } catch (err) {
    throw new ExpressError("Blog not found", 404);
  }
};
