const express = require("express");
const path = require("path");
const logger = require("morgan");
// cross origin access
const cors = require("cors");
// const mongoose = require('mongoose');
const User = require("./models/user");
const Category = require("./models/expense_category");

const passport = require("passport");
const session = require("express-session");
const initializePassport = require("./config/passport-config.js");
const bcrypt = require("bcrypt");
const { log } = require("console");

// const bcrypt = require("bcrypt");

require("dotenv").config();
require("./config/mongoDatabase");

const app = express();

// access
app.use(
  cors({
    origin: "*",
  })
);

// logs the different requests to our server
app.use(logger("dev"));

//parse stringified objects (JSON)
app.use(express.json());

initializePassport(
  passport,
  // passport tells us that they want a function that will return the correct user given an email
  async (email) => {
    let user = User.findOne({ email: email });
    return user;
  },
  async (id) => {
    let user = User.findById(id);
    return user;
  }
);

app.use(
  session({
    secure: true,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { originalMaxAge: 300000 },
  })
);

// server build folder
app.use(express.static(path.join(__dirname, "build")));

app.get("/test_route", (req, res) => {
  res.send("good route!");
});

// get session
app.get("/session-info", (req, res) => {
  let sess = req.session;
  if (sess.passport) {
    delete sess.passport.user.email;
    delete sess.passport.user.password;
  }
  res.json({
    session: sess,
  });
});

// login route
app.put("/user/login", async (req, res, next) => {
  // passport authentication
  // let passport do the authentification
  // passport.authenticate will grab the login form infos from req.body and use them to perform the authentification
  passport.authenticate("local", (err, user, message) => {
    // handle the error
    if (err) throw err;
    if (!user) {
      res.json({
        message: "Incorrect email or password.",
        user: false,
      });
    } else {
      // delete user.password
      req.logIn(user, (err) => {
        if (err) throw err;
        res.json({
          message: "successfully authenticated.",
          // remove user
        });
      });
    }
  })(req, res, next);
});

// logout
app.get("/user/logout", (req, res) => {
  req.session.destroy(function (err) {
    console.log("logout");
    res.redirect("/"); //Inside a callback… bulletproof!
  });
});

app.post("/user/sign_up", async (req, res) => {
  // delete confirm password
  delete req.body.confirmPassword;
  // Encrypt the password
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  // user object data
  let user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  };
  try {
    // check if the user already exists
    let check = await User.findOne({ email: user.email });
    if (check !== null) {
      res.send("User already exists.");
    } else if (check === null) {
      try {
        let response = await User.create(user);
        console.log(response);
        res.send("success");
      } catch (error) {
        console.log(error);
        res.send("An Error has occured.");
      }
    }
  } catch (error) {
    console.log(error);
    res.send("An Error has occured.");
  }
});

// get all house expense category
app.get("/get/house_expense_category", async (req, res) => {
  let response = await Category.General.find({});

  res.send(response);
});

// create a house expense category
app.post("/add/house_expense_category", async (req, res) => {
  let data = req.body;
  console.log(data);
  try {
    await Category.General.create(data);
    res.send("added");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Get all personal expense categories
app.get("/get/personal_expense_category", async (req, res) => {
  let response = await Category.Personal.find({});

  res.send(response);
});

// Create a personal expense category
app.post("/add/personal_expense_category", async (req, res) => {
  let data = req.body;
  console.log(data);
  try {
    await Category.Personal.create(data);
    res.send("added");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.get("/get/expenses", async (req, res) => {
  let data = req.query;
  try {
    console.log(data);
    let response = await Category.Expense.find(data);
    res.send(response);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

app.post("/add/expense", async (req, res) => {
  const expense = req.body.data;
  try {
    let response = await Category.Expense.create(expense);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(5000, () => {
  console.log(`Server is Listening on 5000`);
});
