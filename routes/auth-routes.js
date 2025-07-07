// Import packages and User model
const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT || 10;

const User = require("./../models/User.model");

const isNotLoggedIn = require("./../middlewares/isNotLoggedIn");
const { authLimiter } = require("../middlewares/rateLimiter");

// Validation helpers
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

router.get("/signup", isNotLoggedIn, (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", authLimiter, isNotLoggedIn, (req, res) => {
  // Get values form form
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !password || !email) {
    return res.render("auth/signup", {
      errorMessage: "All fields are required.",
    });
  }

  if (username.length < 3) {
    return res.render("auth/signup", {
      errorMessage: "Username must be at least 3 characters long.",
    });
  }

  if (!isValidEmail(email)) {
    return res.render("auth/signup", {
      errorMessage: "Please provide a valid email address.",
    });
  }

  if (!isValidPassword(password)) {
    return res.render("auth/signup", {
      errorMessage:
        "Password must be at least 8 characters long and contain at least 1 uppercase, 1 lowercase, and 1 number.",
    });
  }

  // Check if user already exists
  User.findOne({ $or: [{ email }, { username }] })
    .then((user) => {
      //If user exists, send error
      if (user) {
        const errorMessage =
          user.email === email
            ? "This email is already registered. Please use a different email."
            : "This username is already taken. Please choose a different username.";

        return res.render("auth/signup", { errorMessage });
      }

      // Hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);

      // If user does not exist, create it
      return User.create({ username, email, password: hash });
    })
    .then((newUser) => {
      if (newUser) {
        // Once created, redirect
        res.redirect(`/home/${newUser._id}`);
      }
    })
    .catch((err) => {
      console.error("Signup error:", err);
      res.render("auth/signup", {
        errorMessage: "An error occurred during signup. Please try again.",
      });
    });
});

router.get("/login", isNotLoggedIn, (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", authLimiter, isNotLoggedIn, (req, res) => {
  // Get values form form
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.render("auth/login", {
      errorMessage: "Email and password are required.",
    });
  }

  if (!isValidEmail(email)) {
    return res.render("auth/login", {
      errorMessage: "Please provide a valid email address.",
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.render("auth/login", {
          errorMessage: "Invalid credentials. Please try again.",
        });
      }

      req.app.locals.user = user;
      const encryptedPassword = user.password;
      const passwordCorrect = bcrypt.compareSync(password, encryptedPassword);

      if (passwordCorrect) {
        req.session.currentUser = user;
        res.redirect(`/home/${user._id}`);
      } else {
        res.render("auth/login", {
          errorMessage: "Invalid credentials. Please try again.",
        });
      }
    })
    .catch((err) => {
      console.error("Login error:", err);
      res.render("auth/login", {
        errorMessage: "An error occurred during login. Please try again.",
      });
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.render("error", { message: "Something went wrong!" });
    } else {
      req.app.locals.user = undefined;
      res.redirect("/");
    }
  });
});

module.exports = router;
