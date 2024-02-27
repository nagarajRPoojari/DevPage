const express = require("express");
const router = express.Router();
const users = require("../controller/user");
const blogs = require("../controller/blog");
const { isLoggedIn, isloggedin } = require("../middlewares");
const catchAsync = require("../utilities/catchAsync");
router.route("/blogs/").get(blogs.allblogs);
router.route("/blogs/:id").get(isloggedin, blogs.show);

module.exports = router;
