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
const { default: mongoose } = require("mongoose");

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
    secret: process.env.REACT_APP_SESSION_SECRET,
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
    res.redirect("/"); //Inside a callback… bulletproof!
  });
});

app.post("/user/sign_up", async (req, res) => {
  // delete confirm password
  delete req.body.confirmPassword;
  // Encrypt the password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
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
        User.create(user).then(() => {
          res.send("success");
        });
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
  try {
    await Category.Personal.create(data);
    res.send("added");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.get("/get/specific_expenses", async (req, res) => {
  const data = req.query;
  const type = data.type;
  const user = data.user;
  const month = +data.month;
  const year = +data.year;
  const page = data.page ? data.page : 1;
  const pageSize = 5;
  const skipCount = pageSize * (page - 1);
  const collection =
    type === "house" ? Category.GeneralExpense : Category.PersonalExpense;

  try {
    console.log(user, type, month);

    let response = await collection
      .find({
        user: user,
        $expr: {
          $eq: [{ $month: "$date" }, month + 1],
        },
      })
      .populate("expenseType", "name")
      .sort({ date: -1 })
      .skip(skipCount)
      .limit(pageSize);

    //Get the count per period
    const totalCount = await collection.countDocuments({
      user: user,
      $expr: {
        $eq: [{ $month: "$date" }, month + 1],
      },
    });

    // Get the number of pages
    const maxPageNumber = totalCount / pageSize;

    const hasNextPage = page < maxPageNumber;

    res.send({ response, maxPageNumber, hasNextPage });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

app.post("/add/house_expense", async (req, res) => {
  const expense = req.body.data;
  try {
    let response = await Category.GeneralExpense.create(expense);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.get("/get/sum_by_category", async (req, res) => {
  const data = req.query;
  const user = data.user;
  const type = data.type;
  const month = +data.month;
  const year = +data.year;
  const Collection =
    type === "house" ? Category.GeneralExpense : Category.PersonalExpense;
  const RefCategogry =
    type === "house" ? "generalcategories" : "personalcategories";
  try {
    const expenseSumByType = await Collection.aggregate([
      {
        $lookup: {
          from: RefCategogry, // Replace "expenseTypes" with the actual collection name containing expense types
          localField: "expenseType", // field reference in the current collection
          foreignField: "_id", // type of foreign field
          as: "expenseTypeInfo", // They was to group it
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { $arrayElemAt: ["$expenseTypeInfo", 0] },
              "$$ROOT",
            ],
          },
        },
      },
      {
        $match: {
          user: new mongoose.Types.ObjectId(user),
          $expr: {
            $eq: [{ $month: "$date" }, month + 1],
          },
        },
      },
      {
        // Group the items
        $group: {
          _id: "$expenseType",
          name: { $first: "$name" },
          totalAmount: { $sum: "$amount" },
          data: { $push: "$$ROOT" },
        },
      },
      {
        $sort: {
          totalAmount: -1,
        },
      },
    ]);
    res.send(expenseSumByType);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

app.get("/get/specific_personal_expenses", async (req, res) => {
  const data = req.query;
  const user = data.user;
  const month = +data.month;
  const year = +data.year;
  const page = data.page ? data.page : 1;
  const pageSize = 1;
  const skipCount = pageSize * (page - 1);

  try {
    let response = await Category.PersonalExpense.find({
      user: user,
      $expr: {
        $eq: [{ $month: "$date" }, month + 1],
      },
    })
      .populate("expenseType", "name")
      .sort({ date: -1 })
      .skip(skipCount)
      .limit(pageSize);

    //Get the count per period
    const totalCount = await Category.PersonalExpense.countDocuments({
      user: user,
      $expr: {
        $eq: [{ $month: "$date" }, month + 1],
      },
    });

    // Get the number of pages
    const maxPageNumber = totalCount / pageSize;

    const hasNextPage = page < maxPageNumber;

    res.send({ response, maxPageNumber, hasNextPage });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

app.post("/add/personal_expense", async (req, res) => {
  const expense = req.body.data;
  try {
    let response = await Category.PersonalExpense.create(expense);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.get("/get/expense_period/", async (req, res) => {
  const user = req.query.user;
  const Collection =
    req.query.period === "house"
      ? Category.GeneralExpense
      : Category.PersonalExpense;
  const result = await Collection.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(user), // Match expenses for the specific user ID
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          year: { $year: "$date" },
        },
      },
    },
    {
      $project: {
        month: "$_id.month",
        year: "$_id.year",
      },
    },
    {
      $sort: {
        year: -1,
        month: -1,
      },
    },
  ]);
  res.send(result);
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(5000, () => {
  console.log(`Server is Listening on 5000`);
});
