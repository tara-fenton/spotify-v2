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
  addSongToPlaylist,
  deleteSongFromPlaylist,
};

function index(req, res) {
  Playlist.find(function(err, playlists) {
    res.render("playlists/index", { title: "All playlists", playlists });
  });
}

function newPlaylist(req, res) {
  res.render("playlists/new", { title: "Add a playlist" });
}

function create(req, res) {
  const playlist = new Playlist(req.body);
  // console.log(playlist);
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
    Song.find(function(err, allSongs) {
      Song.find()
        .where("_id")
        .in(playlist.songs)
        .exec((err, playlistSongs) => {
          res.render("playlists/show", {
            title: "Playlist Details",
            playlist,
            allSongs,
            playlistSongs,
          });
        });
    });
  });
}

function addSongToPlaylist(req, res) {
  Song.findById(req.params.song_id, function(err, song) {
    Playlist.findById(req.params.id, function(err, playlist) {
      playlist.songs.push(song);
      playlist.save(function(err) {
        if (err) return res.render("playlists/");
        Song.find(function(err, songs) {
          res.redirect(`/playlists/${req.params.id}`);
        });
      });
    });
  });
}

function deleteSongFromPlaylist(req, res) {
  Song.findById(req.params.song_id, function(err, song) {
    Playlist.findById(req.params.id, function(err, playlist) {
      playlist.songs.pull(song);
      playlist.save(function(err) {
        if (err) return res.render("playlists/");
        Song.find(function(err, songs) {
          res.redirect(`/playlists/${req.params.id}`);
        });
      });
    });
  });
}
