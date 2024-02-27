const express = require("express");
const router = express.Router();
const users = require("../controller/user");
const blogs = require("../controller/blog");
const Review = require("../controller/review");
const { isLoggedIn, isloggedin } = require("../middlewares");
const catchAsync = require("../utilities/catchAsync");

router.route("/blogs/:id").post(Review.create);

module.exports = router;
