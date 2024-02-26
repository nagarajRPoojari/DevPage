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
const axios = require("axios");
const port = process.env.PORT || 8000;
const dbUrl = process.env.DB_URL;
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const userRoutes = require("./router/user");
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
      clientID: "eaa08773d3805395dcc8",
      clientSecret: "6af808ee3a23af31d1398d3be9c53f9ba29edb12",
      callbackURL: "http://localhost:8000/auth/github/callback",
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
  res.json(req.user);
});

app.get(
  "/auth/user/login",
  passport.authenticate("github", { scope: ["user"], prompt: "login" })
);

app.use("/auth", userRoutes);

app.listen(port, function () {
  console.log(`Live on port: ${port}!`);
});
