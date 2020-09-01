var mongoose = require("mongoose");

var playlistSchema = new mongoose.Schema(
  {
    title: String,
    // songs: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Playlist", playlistSchema);
