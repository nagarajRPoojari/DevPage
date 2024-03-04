const express = require("express");
const multer = require("multer");
const catchAsync = require("../utilities/catchAsync").default;
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();
const blogs = require("../controller/blog");
const { isloggedin } = require("../middlewares");
router.route("/blogs/").get(blogs.allblogs);
router.route("/blogs/create").get(isloggedin, blogs.renderCreate);
router.route("/blogs/:id").get(isloggedin, catchAsync(blogs.show));
router
  .route("/blogs/create")
  .post(isloggedin, upload.single("file"), blogs.create);

module.exports = router;
