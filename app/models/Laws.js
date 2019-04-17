const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const LawSchema = new Schema({
  LawNumber: {
    type: Number
  },

  fixedValues: {
    type: [
      {
        description: String,
        value: Number
      }
    ]
  },

  percentages: {
    type: [
      {
        value: Number,
        min: Number,
        max: Number,
        description: String
      }
    ]
  }
});

module.exports = Laws = mongoose.model("Laws", LawSchema);
