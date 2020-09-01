const Song = require("../models/song");
// const Song = require("../models/song");

module.exports = {
  index,
  new: newSong,
  create,
  edit,
};

function index(req, res) {
  Song.find({})
    .populate("user")
    .exec(function(err, songs) {
      console.log(songs);
      res.render("songs/index", { title: "All Songs", songs });
    });
}

function newSong(req, res) {
  res.render("songs/new", { title: "Add a Song" });
}

function create(req, res) {
  const song = new Song(req.body);
  console.log(song);
  song.save(function(err) {
    if (err) return res.render("songs/new");
    res.redirect("/songs");
  });
}

function edit(req, res) {
  Song.findById(req.params.id, function(err, song) {
    res.render("songs/edit", { title: "Edit song", song });
  });
}
