var mongoose = require("mongoose");

var songSchema = new mongoose.Schema(
  {
    title: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Song", songSchema);
