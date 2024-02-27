const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  author: { type: Schema.Types.ObjectId, require: true, ref: "User" },
  blog: { type: Schema.Types.ObjectId, require: true, ref: "Blog" },
  text: String,
  likes: { type: Number, default: 0 },
  posted_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", ReviewSchema);
