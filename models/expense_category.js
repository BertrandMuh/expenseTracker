const mongoose = require("mongoose");

const generalCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const GeneralCategory = mongoose.model(
  "GeneralCategory",
  generalCategorySchema
);

module.exports = GeneralCategory;
