const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  email: { type: String, require: true },
  email_verified: String,
  about: String,
  profile_pic: String,
  social_media_urls: [String],
  skills: [String],
  username: String,
  first_name: String,
  last_name: String,
  name: String,
  education: String,
  address: String,
  country: String,
  company: String,
  phone: String,
  job: String,
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  bookmarks: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  projects: [{ type: String }],
  blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
});

module.exports = mongoose.model("User", UserSchema);
