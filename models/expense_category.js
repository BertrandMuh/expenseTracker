const mongoose = require("mongoose");
const User = require("./user");

const generalCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const GeneralCategory = mongoose.model(
  "GeneralCategory",
  generalCategorySchema
);

const personalCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const PersonalCategory = mongoose.model(
  "PersonalCategory",
  personalCategorySchema
);

const expenseSchema = new mongoose.Schema(
  {
    expenseType: { type: String, required: true },
    companyName: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    isHouseExpense: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Expense = mongoose.model("ExpenseData", expenseSchema);

let Category = {
  General: GeneralCategory,
  Personal: PersonalCategory,
  Expense: Expense,
};

module.exports = Category;
