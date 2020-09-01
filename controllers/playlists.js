const Playlist = require("../models/playlist");

module.exports = {
  index,
  new: newPlaylist,
  create,
  edit,
  update,
  delete: deletePlaylist,
};

function index(req, res) {
  Playlist.find({})
    .populate("user")
    .exec(function(err, playlists) {
      console.log(playlists);
      res.render("playlists/index", { title: "All playlists", playlists });
    });
}

function newPlaylist(req, res) {
  res.render("playlists/new", { title: "Add a playlist" });
}

function create(req, res) {
  const playlist = new Playlist(req.body);
  console.log(playlist);
  playlist.save(function(err) {
    if (err) return res.render("playlists/new");
    res.redirect("/playlists");
  });
}

function edit(req, res) {
  Playlist.findById(req.params.id, function(err, playlist) {
    res.render("playlists/edit", { title: "Edit Playlist", playlist });
  });
}

function update(req, res) {
  Playlist.findByIdAndUpdate(req.params.id, req.body, function(err, playlist) {
    if (err) {
      res.render("playlists/edit", { title: "Edit Playlist", playlist });
    }
    res.redirect("/playlists");
  });
}

function deletePlaylist(req, res) {
  Playlist.findByIdAndDelete(req.params.id, function(err, playlist) {
    if (err) {
      console.log(err);
    }
    res.redirect("/playlists");
  });
}
