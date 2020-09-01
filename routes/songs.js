var express = require("express");
var router = express.Router();

var Song = require("../models/song");

// GET /songs
router.get("/", function(req, res) {
  Song.find({})
    .populate("user")
    .exec(function(err, songs) {
      console.log(songs);
      res.render("songs/index", { title: "All Songs", songs });
    });
});

module.exports = router;
