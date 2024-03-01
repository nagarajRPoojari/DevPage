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
const categories = [
  "Data science",
  "Machine learning",
  "Python",
  "Quantum",
  "Algorithms",
  "Internship",
  "Software",
];

function getRandomSubset(arr) {
  const numberOfElements = Math.floor(Math.random() * arr.length) + 1; // Random number of elements
  const shuffledArr = arr.sort(() => Math.random() - 0.5); // Shuffle the array
  return shuffledArr.slice(0, numberOfElements); // Return a subset of the shuffled array
}
const seeDB = async () => {
  const a = await User.find({});
  console.log(a);
};

seeDB();
