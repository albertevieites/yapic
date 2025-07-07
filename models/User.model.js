const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const {
  USER_GENDERS,
  USER_COUNTRIES,
  USER_INTERESTS,
} = require("../constants");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [20, "Username cannot exceed 20 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please provide a valid email address",
    ],
  },

  age: {
    type: Number,
  },

  genre: {
    type: [String],
    required: false,
    enum: USER_GENDERS,
  },

  country: {
    type: [String],
    required: false,
    enum: USER_COUNTRIES,
  },

  interests: {
    type: [String],
    required: false,
    enum: USER_INTERESTS,
  },

  userPhotoUrl: {
    type: String,
    default:
      "https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg",
  },

  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

// Add indexes for better performance
// Note: email and username already have indexes due to unique: true
userSchema.index({ interests: 1 });

const User = model("User", userSchema);

module.exports = User;
