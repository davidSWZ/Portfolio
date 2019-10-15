const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let competence = new Schema({
  value:{
    type: String
  },
  icon:{
    type:String
  }
});

module.exports = mongoose.model('competence', competence);
