var express = require("express");
var router = express.Router();

const songsController = require("../controllers/songs.js");

// GET /songs
router.get("/", songsController.index);
// GET /songs/new
router.get("/new", songsController.new);
// POST /songs
router.post("/", songsController.create);

module.exports = router;
