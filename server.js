
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      passport = require('passport'),
      localStrategy = require('passport-local'),
      User = require('./models/user'),
      expressSession = require('express-session'),
      formData = require("express-form-data"),
      mongoose = require('mongoose'),
      path = require('path');

//Liaison au fichier .env
require('dotenv').config();

app.use(formData.parse());

app.use(express.static('public'));

app.use(cors());
app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



//Configuration de MongoDB
mongoose.connect(process.env.MONGODB, {useNewUrlParser:true, useFindAndModify: false })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('the DB is opened');
})

//Configuration de passport
app.use(expressSession({
  secret:"Hope this will works",
  resave:true,
  saveUninitialized:true,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

//Configuration pour passer en production sur Heroku
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });

app.listen(process.env.PORT, function() {
  console.log('the server is running successfully')
});
