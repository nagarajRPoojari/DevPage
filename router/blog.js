const express = require("express");
const router = express.Router();
const blogs = require("../controller/blog");
const { isloggedin } = require("../middlewares");
router.route("/blogs/").get(blogs.allblogs);
router.route("/blogs/create").get(isloggedin, blogs.renderCreate);
router.route("/blogs/:id").get(isloggedin, blogs.show);
router.route("/blogs/create").post(isloggedin, blogs.create);

module.exports = router;
