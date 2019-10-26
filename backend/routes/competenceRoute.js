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
  if(req.body.id && req.body.id !== null){
    competences.findOneAndUpdate({_id:req.body.id}, req.body, function (err) {
      if(!err) {
        res.status(200).json({'competence':'competence modified'});
        console.log('Competence updated');
      } else {
        res.status(400).send('A problem occured')
        console.log(err);
      }
    })
  } else (
    newCompetence.save()
    .then(newCompetence => {
      res.status(200).json({'competence':'New competence added successfully'});
      console.log('competence:New competence added successfully');
    })
    .catch(err => {
      res.status(400).send('A problem occured');
      console.log(err);
    })
  )
});

router.delete('/delete', function(req, res) {
  competences.deleteOne({value:req.body.Value}, function(err) {
    if(!err) {
      console.log('Deleted one');
    } else {
      console.log(err);
    }
  })
});

module.exports = router
