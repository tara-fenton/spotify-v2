var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("songs/index", { title: "Songs", user: req.user });
});

module.exports = router;
