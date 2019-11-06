
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      passport = require('passport'),
      localStrategy = require('passport-local'),
      User = require('./models/user'),
      formData = require("express-form-data"),
      mongoose = require('mongoose');

//Liaison au fichier .env
require('dotenv').config();

app.use(formData.parse());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Configuration de passport
app.use(require("express-session")({
  secret:"Hope this will works",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Configuration de MongoDB
mongoose.connect(process.env.MONGODB, {useNewUrlParser:true, useFindAndModify: false })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('the DB is opened');
})

//Configuration des routes
const homeRoute = require('./routes/homeRoute'),
      competenceRoute = require('./routes/competenceRoute'),
      experienceRoute = require('./routes/experienceRoute'),
      portfolioRoute = require('./routes/portfolioRoute');
      signinRoute = require('./routes/signinRoute');
      mailerRoute = require('./routes/mailerRoute');

app.use('/home', homeRoute);
app.use('/competence', competenceRoute);
app.use('/experience', experienceRoute);
app.use('/portfolio', portfolioRoute);
app.use('/signin' , signinRoute);
app.use('/mailer', mailerRoute);

// app.post("/register", function(req, res) {
//   var admin = new User({username:req.body.username});
//   User.register(admin, req.body.password, function(err) {
//     if(err){
//       console.log(err);
//     } else {
//       passport.authenticate("local")(req, res, function() {
//         console.log("admin created");
//       })
//     }
//   })
// })

app.listen(process.env.PORT, function() {
  console.log('the server is running successfully')
});
