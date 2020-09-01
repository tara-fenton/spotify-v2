var express = require("express");
var router = express.Router();

const playlistsController = require("../controllers/playlists.js");

// GET /playlists
router.get("/", playlistsController.index);

module.exports = router;
