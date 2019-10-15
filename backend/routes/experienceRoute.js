const express = require('express'),
      router = express.Router(),
      experience = require('../models/experience-model');

router.get('/', function(req, res) {
  experience.find(function(err, experience) {
    if(err) {
      console.log(err);
    } else {
      res.json(experience);
    }
  })
});

router.post('/add', function(req, res) {
  let newExperience = new experience(req.body);
  newExperience.save()
    .then(newExperience => {
      res.status(200).json({'experience':'New experience added successfully'})
    })
    .catch(err => {
      res.status(400).send('A problem occured')
    })
});

router.delete('/delete', function(req, res) {
  experience.remove({}, function(err) {
    if(!err) {
      console.log('Deleted all experiences');
    } else {
      console.log(err);
    }
  })
})
module.exports = router
