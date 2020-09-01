const Playlist = require("../models/playlist");

module.exports = {
  index,
};

function index(req, res) {
  Playlist.find({})
    .populate("user")
    .exec(function(err, playlists) {
      console.log(playlists);
      res.render("playlists/index", { title: "All playlists", playlists });
    });
}
