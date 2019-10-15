const express = require('express'),
      router = express.Router();
      competences = require('../models/competence-model');

router.get('/', function(req, res) {
  competences.find(function(err, competence) {
    if(err) {
      console.log(err);
    } else {
      res.json(competence);
    }
  })
});

router.post('/add', function(req, res) {
  let newCompetence = new competences(req.body);
  newCompetence.save()
    .then(newCompetence => {
      res.status(200).json({'competence':'New competence added successfully'})
    })
    .catch(err => {
      res.status(400).send('A problem occured')
    })
});

router.delete('/delete', function(req, res) {
  competences.remove({}, function(err) {
    if(!err) {
      console.log('Deleted all');
    } else {
      console.log(err);
    }
  })
})

module.exports = router
