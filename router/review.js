const express = require("express");
const router = express.Router();
const Review = require("../controller/review");
const { isLoggedIn, isloggedin } = require("../middlewares");
const catchAsync = require("../utilities/catchAsync").default;

router.route("/blogs/:id/new").post(isloggedin, Review.create);
router.route("/blogs/:id/:reviewId").post(isloggedin, Review.like);
module.exports = router;
