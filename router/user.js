const express = require("express");
const router = express.Router();
const users = require("../controller/user");
const { isLoggedIn, isloggedin } = require("../middlewares");
const catchAsync = require("../utilities/catchAsync");
router.get("/", users.renderAuth);
router.route("/user/register").get(users.register);

router.route("/user/login").get(users.login);

router.route("/user/logout").get(isloggedin, users.logout);

router.route("/github/callback").get(users.auth);

router.get("/user/profile", isloggedin, users.profile);
router.get("/user/public/:id", isloggedin, users.user);

module.exports = router;