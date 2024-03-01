const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: String,
  description: String,
  author: { type: Schema.Types.ObjectId, require: true, ref: "User" },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  text: String,
  category: [String],
  likes: Number,
  posted_date: { type: Date, default: Date.now },
  last_updated: { type: Date, default: Date.now },
  image: String,
});

module.exports = mongoose.model("Blog", BlogSchema);
