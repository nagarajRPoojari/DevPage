if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL;
const User = require("../module/User");
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("database conected");
});

const sample = (a) => a[Math.floor(Math.random() * a.length)];
const seeDB = async () => {
  await User.deleteMany({});
  const user = new User({
    _id: "5099803df3f4948bd2f98391",
    username: "nags",
    email: "oh@gmail.com",
  });
  await user.save();
  console.log(user);
};
seeDB();
