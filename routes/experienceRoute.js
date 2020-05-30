const express = require('express'),
      router = express.Router(),
      experience = require('../models/experience-model');

//Récupère les expériences du CV
router.get('/', function(req, res) {
  experience.find(function(err, experience) {
    if(err) {
      console.log(err);
    } else {
      res.json(experience);
    }
  })
});

//Ajoute une expérience au CV
router.post('/add', function(req, res) {
  let newExperience = new experience(req.body);
  if(req.body.id && req.body.id !== null){
    experience.findOneAndUpdate({_id:req.body.id}, req.body, function (err) {
      if(!err) {
        res.status(200).json({'experience':'experience modified'});
        console.log('experience updated');
      } else {
        res.status(400).send('A problem occured')
        console.log(err);
      }
    })
  } else (
    newExperience.save()
    .then(newExperience => {
      res.status(200).json({'experience':'New experience added successfully'});
      console.log('experience:New experience added successfully');
    })
    .catch(err => {
      res.status(400).send('A problem occured');
      console.log(err);
    })
  )
});

//Supprime un expérience du CV
router.delete('/delete', function(req, res) {
  experience.deleteOne({_id:req.body.id}, function(err) {
    if(!err) {
      console.log('Deleted one experience');
    } else {
      console.log(err);
    }
  })
});

module.exports = router
