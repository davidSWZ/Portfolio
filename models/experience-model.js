const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let experience = new Schema({
  title: {
    type : String
  },
  where : {
    type : String
  },
  when : {
    type : String
  },
  description : {
    type : String
  }
})

module.exports = mongoose.model('experience', experience);
