if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL;
const User = require("../module/User");
const Blog = require("../module/Blog");
const Review = require("../module/review");
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("database conected");
});
//5099803df3f4948b56950098
const seeDB = async () => {
  await Blog.deleteMany({});
};
seeDB();
