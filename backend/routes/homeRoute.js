const express = require('express'),
      router = express.Router(),
      home = require('../models/home-model');

router.get('/', function(req, res) {
  home.find(function(err, foundHome) {
    if(err) {
      console.log(err);
    } else {
      res.json(foundHome);
    }
  })
});

router.post('/update/:id', function(req, res) {
  let newTitle = req.body.home_title,
      newDescription = req.body.home_description;
      newHome = {
        home_title: newTitle,
        home_description: newDescription
      }

  home.findOneAndUpdate({_id:req.params.id}, newHome, function(err, foundHome) {
      if(err) {
        res.status(400).send('updating home failed');
      } else {
        res.send('OK')
      }
    }
  )
});

module.exports = router
