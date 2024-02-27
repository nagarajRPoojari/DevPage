if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL;
const User = require("../module/User");
const Blog = require("../module/Blog");
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
  const blog = await Blog.insertMany({
    author: "5099803df3f4948b56950098",
    title: "Artificial Intelligence sucks",
    text: "The year is 1958. I am 10 years old, leaning against the floor-standing woodgrain radio whose music has set my entire household in motion.The man on the radio is Lloyd Price, and he is singing about a legendary figure, the seriously bad nigga known as Stagger Lee. We don’t know that this song is based on a real-life figure from the late 19th and early 20th-century, whose name was Lee Shelton — defined online as an American criminal",
  });
};
seeDB();
