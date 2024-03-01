if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const { urlencoded } = require("express");
const ejsMate = require("ejs-mate");
const catchAsync = require("./utilities/catchAsync");
const ExpressError = require("./utilities/ExpressError");
const port = process.env.PORT || 8000;
const dbUrl = process.env.DB_URL;
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const userRoutes = require("./router/user");
const blogRoutes = require("./router/blog");
const reviewRoutes = require("./router/review");
const { isLoggedIn, isloggedin } = require("./middlewares");
const flash = require("connect-flash");
const User = require("./module/User");
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connection successfull");
  })
  .catch((e) => {
    console.log("databse connection unsuccessfull  " + e);
  });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
mongoose.set("strictQuery", false);

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(new Error("User not found"));
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      prompt: "login",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findById("5099803df3f4948b" + profile.id);
        if (!user) {
          const newUser = new User({
            _id: "5099803df3f4948b" + profile.id,
            username: profile.username,
            email: profile.emails ? profile.emails[0].value : null,
          });
          await newUser.save();
          return done(null, newUser);
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.get("/", (req, res) => {
  res.render("home", { currentUser: req.user });
});

app.use(flash());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get(
  "/auth/user/login",
  passport.authenticate("github", { scope: ["user"], prompt: "login" })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "/blogs",
    failureRedirect: "/auth/user/login",
  })
);

app.use("/", blogRoutes);

app.use("/auth", userRoutes);
app.use("/", reviewRoutes);

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.all("*", (req, res, next) => {
  next(new ExpressError("PAGE NOT FOUND!!!!", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "oh No,Something went wrong";
  res.status(statusCode).render("error", { err });

  next();
});

app.listen(port, function () {
  console.log(`Live on port: ${port}!`);
});
