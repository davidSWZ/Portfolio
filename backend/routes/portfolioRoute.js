const express = require('express'),
      router = express.Router(),
      projet = require('../models/portfolio-model');

router.get('/', function(req, res) {
  projet.find(function(err, projet) {
    if(err) {
      console.log(err);
    } else {
      res.json(projet);
    }
  })
});

router.post('/add', function(req, res) {
  let newprojet = new projet(req.body);
  newprojet.save()
    .then(newprojet => {
      res.status(200).json({'portfolio':'New projet added successfully'})
    })
    .catch(err => {
      res.status(400).send('A problem occured')
    })
});

router.delete('/delete', function(req, res) {
  projet.remove({}, function(err) {
    if(!err) {
      console.log('Deleted al projectsl');
    } else {
      console.log(err);
    }
  })
})

module.exports = router
