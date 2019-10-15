const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new Schema({
  username:{
    type:String
  },
  passport:{
    type:String
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('User', userSchema);
