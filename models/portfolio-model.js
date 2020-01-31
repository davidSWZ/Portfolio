const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let projet = new Schema ({
  title: {
    type: String
  },
  description: {
    type: String
  },
  photo: {
    type: String
  },
  techno: {
    type: String
  },
  lienProjet: {
    type: String
  },
  lienGitHub: {
    type: String
  }
});

module.exports = mongoose.model('projet', projet);
