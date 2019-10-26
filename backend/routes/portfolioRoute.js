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

  if(req.body.id && req.body.id !== null){
    projet.findOneAndUpdate({_id:req.body.id}, req.body, function (err) {
      if(!err) {
        res.status(200).json({'projet':'projet modified'});
        console.log('projet updated');
      } else {
        res.status(400).send('A problem occured')
        console.log(err);
      }
    })
  } else (
    newprojet.save()
    .then(newprojet => {
      res.status(200).json({'projet':'New projet added successfully'});
      console.log('projet:New projet added successfully');
    })
    .catch(err => {
      res.status(400).send('A problem occured');
      console.log(err);
    })
  )
});

router.delete('/delete', function(req, res) {
  projet.deleteOne({_id:req.body.id}, function(err) {
    if(!err) {
      console.log('Deleted one projet');
    } else {
      console.log(err);
    }
  })
});

module.exports = router
