const mongoose = require("mongoose");

const TestCaseSchema = new mongoose.Schema({
  userId: String,
  repo: String,
  fileName: String,
  summary: String,
  code: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TestCase", TestCaseSchema);
