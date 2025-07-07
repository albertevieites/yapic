const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User.model.js");
const fileUploader = require("../config/cloudinary");
const { USER_INTERESTS } = require("../constants");

const saltRounds = process.env.SALT || 10;

const isLoggedin = require("../middlewares/isLoggedIn");

router.get("/profile/:id", isLoggedin, (req, res) => {
  const id = req.params.id;
  res.render("private/profile", {
    user: req.session.currentUser,
    enumOptions: USER_INTERESTS,
  });
});

router.post("/profile", fileUploader.single("userPhotoUrl"), (req, res) => {
  //Get the user id from the session
  const userId = req.session.currentUser._id;

  //Get the form data from the body
  const { username, password, email, age, genre, country, interests } =
    req.body;

  //Get the image url from uploading
  let userPhotoUrl = undefined;
  if (req.file) userPhotoUrl = req.file.path;

  // Prepare update object
  const updateData = {
    username,
    email,
    age,
    genre,
    country,
    interests,
  };

  // Only add userPhotoUrl if a new image was uploaded
  if (userPhotoUrl) {
    updateData.userPhotoUrl = userPhotoUrl;
  }

  // Only hash and update password if a new one was provided
  if (password && password.trim() !== "") {
    const salt = bcrypt.genSaltSync(saltRounds);
    updateData.password = bcrypt.hashSync(password, salt);
  }

  User.findByIdAndUpdate(userId, updateData, { new: true })
    .then((editUser) => {
      req.session.currentUser = editUser;
      res.redirect(`/profile/${userId}`);
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
      res.render("error", { message: "Error updating profile" });
    });
});

module.exports = router;
