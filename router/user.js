const express = require("express");
const router = express.Router();
const users = require("../controller/user");
const { isLoggedIn } = require("../middlewares");
const catchAsync = require("../utilities/catchAsync");
router.route("/user/register").get(users.register);

router.route("/user/login").get(users.login);

router.route("/user/logout").get(users.logout);

router.route("/github/callback").get(users.auth);

router.get("/user/profile", users.profile);
module.exports = router;
