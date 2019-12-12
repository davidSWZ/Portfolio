const express = require('express'),
      passport = require("passport"),
      router = express.Router();

var username;

router.post("/",passport.authenticate("local"), (req, res) => {
  if(req.isAuthenticated()) {
    username = req.user.username;
    res.send(username);
  }
});

module.exports = router
