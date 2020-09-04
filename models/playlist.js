var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var playlistSchema = new Schema(
  {
    title: String,
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Playlist", playlistSchema);
