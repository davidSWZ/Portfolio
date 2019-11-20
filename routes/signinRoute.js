const express = require('express'),
      passport = require("passport"),
      router = express.Router();

router.post("/",passport.authenticate("local"), (req, res) => {
  res.send("loggedIn");
});

module.exports = router
