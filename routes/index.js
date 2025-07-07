const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const Post = require("../models/Post.model");
const { USER_INTERESTS } = require("../constants");

const fileUploader = require("./../config/cloudinary");

const isLoggedin = require("../middlewares/isLoggedIn");
const { populate } = require("../models/User.model");

/* GET index page */
router.get("/", (req, res) => {
  res.render("index");
});

/* GET home page */
router.get(
  "/home/:userId",
  isLoggedin,
  fileUploader.single("postPhotoUrl"),
  (req, res) => {
    var myTags = [];
    var myMatches = [];

    User.findById(req.params.userId)
      .populate("posts")
      .then((user) => {
        for (var post of user.posts) {
          for (var tag of post.tags) {
            if (!myTags.includes(tag)) {
              myTags.push(tag);
            }
          }
        }
        return user;
      })
      .then((user) => {
        User.find({ _id: { $ne: req.session.currentUser._id } })
          .then((usersMatch) => {
            usersMatch.forEach((user) => {
              myTags.forEach((tag) => {
                if (user.interests.includes(tag) && !myMatches.includes(user)) {
                  myMatches.push(user);
                }
              });
            });
            return user;
          })
          .then((user) =>
            res.render("home", {
              user: user,
              myTags: myTags,
              myMatches: myMatches,
            })
          );
      });
  }
);

router.post("/post/delete/:postId", isLoggedin, (req, res) => {
  const currentUser = req.session.currentUser;
  const postId = req.params.postId;
  Post.findByIdAndDelete(postId)
    .then(res.redirect(`/home/${currentUser._id}`))
    .catch((err) => console.log(err));
});

/* GET and POST new post */
router
  .route("/post/new")
  .get((req, res, next) =>
    res.render("post-creation", {
      enumOptions: USER_INTERESTS,
      user: req.session.currentUser,
    })
  )
  .post(fileUploader.single("postPhotoUrl"), (req, res) => {
    // Get the user id from the session
    const currentUser = req.session.currentUser;

    // Get the form data from the body
    const { title, description, tags, date } = req.body;
    console.log(req.body);

    // Get the image url from uploading
    const postPhotoUrl = req.file.path;

    console.log(title, description, tags, postPhotoUrl, date);

    Post.create({
      title,
      description,
      tags,
      postPhotoUrl,
      date,
      owner: currentUser._id,
    })
      .then((createdPost) => {
        console.log("Created by ", createdPost);
        User.findByIdAndUpdate(currentUser._id, {
          $push: { posts: createdPost },
        }).then(() => res.redirect(`/home/${currentUser._id}`));
      })
      .catch((error) => {
        console.log(error);
      });
  });

/* GET match profile */
router.route("/match/:matchId").get((req, res, next) => {
  const { matchId } = req.params;
  User.findById(matchId)
    .then((user) => res.render("private/match-profile", user))
    .catch((err) => console.log(err));
});

module.exports = router;
