var express = require("express");
var router = express.Router();

const songsController = require("../controllers/songs.js");

// GET /songs
router.get("/", songsController.index);

// GET /songs/new
router.get("/new", songsController.new);
// POST /songs
router.post("/", songsController.create);

// GET /songs/:id/edit
router.get("/:id/edit", songsController.edit);
// PUT /songs/:id
router.put("/:id", songsController.update);

// DELETE /songs/:id
router.delete("/:id", songsController.delete);

module.exports = router;
