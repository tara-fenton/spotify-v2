const Playlist = require("../models/playlist");
const Song = require("../models/song");

module.exports = {
  index,
  new: newPlaylist,
  create,
  edit,
  update,
  delete: deletePlaylist,
  show,
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

function show(req, res) {
  Playlist.findById(req.params.id, function(err, playlist) {
    console.log("hmmm ", playlist.songs);
    Song.find({ _id: playlist.songs })
      .populate("user")
      .exec(function(err, songs) {
        console.log(songs);
        res.render("playlists/show", {
          title: "Playlist Details",
          playlist,
          songs,
        });
      });
    // const playlistSongs = [];
    // const songs = playlist.songs.forEach(function(err, song) {
    //   console.log("all of th things", playlist.songs[song]);
    //   playlistSongs.push(playlist.songs[song]);
    // });
    // console.log("songggs", songs);
  });
}
