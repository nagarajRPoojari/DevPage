const User = require("../module/User");
const passport = require("passport");
const Review = require("../module/review");
const Blog = require("../module/Blog");

//create
//edit
//delete
//show

//create

module.exports.create = async (req, res) => {
  const blogId = req.params.id;
  const review = await Review.insertMany({
    author: req.user._id,
    blog: blogId,
    text: req.body.text,
  });
  review.save();
};
