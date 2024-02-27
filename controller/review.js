const Review = require("../module/review");
const Blog = require("../module/Blog");

module.exports.create = async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log(req.body);
    const review = await Review.create({
      author: req.user._id,
      blog: blogId,
      text: req.body.text,
    });
    await Blog.findByIdAndUpdate(blogId, { $push: { reviews: review._id } });
    res.redirect(`/blogs/${blogId}`);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.like = async (req, res) => {
  try {
    const blogId = req.params.id;
    const reviewId = req.params.reviewId;
    const action = req.body.action;
    let update;
    if (action === "like") update = { $inc: { likes: 1 } };
    else if (action === "dislike") update = { $inc: { likes: -1 } };

    await Review.findByIdAndUpdate(reviewId, update, { new: true });
    res.redirect(`/blogs/${blogId}`);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
