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

const generalSchema = new mongoose.Schema(
  {
    expenseType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: GeneralCategory,
      required: true,
    },
    companyName: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    isHouseExpense: { type: Boolean, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  },
  { timestamps: true }
);

const General = mongoose.model("HouseExpense", generalSchema);

const personalSchema = new mongoose.Schema(
  {
    expenseType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: PersonalCategory,
      required: true,
    },
    companyName: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    isHouseExpense: { type: Boolean, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  },
  { timestamps: true }
);

const Personal = mongoose.model("Personal", personalSchema);

let Category = {
  General: GeneralCategory,
  Personal: PersonalCategory,
  GeneralExpense: General,
  PersonalExpense: Personal,
};

module.exports = Category;
