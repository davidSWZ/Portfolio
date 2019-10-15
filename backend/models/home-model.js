const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let home = new Schema({
  home_title: {
    type: String
  },
  home_description: {
    type: String
  }
});

module.exports = mongoose.model("home", home);
