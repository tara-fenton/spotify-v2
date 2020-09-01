var express = require("express");
var router = express.Router();

const playlistsController = require("../controllers/playlists.js");

// GET /playlists
router.get("/", playlistsController.index);

// GET /playlists/new
router.get("/new", playlistsController.new);
// POST /playlists
router.post("/", playlistsController.create);

// GET /playlists/:id
router.get("/:id/edit", playlistsController.edit);
// PUT /playlists/:id/edit
router.put("/:id", playlistsController.update);

module.exports = router;
