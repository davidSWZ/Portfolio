const express = require('express'),
      router = express.Router(),
      nodeMailer = require('nodemailer');

//m'envoi un email
router.post('/', function(req, res) {

  //Connection à gmail
  let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });

  // configuration de l'email
  const sender = req.body.name+' '+req.body.surname;
  let mailOptions = {
      from: req.body.mail, 
      to: 'david.swiatkiewiez@gmail.com',
      subject: 'Nouveau message envoyé depuis mon portfolio par '+ sender,
      text: req.body.message +'\n'+'\n'+'Adresse mail de '+sender+': '+ req.body.mail,
  };

  //envoi de l'email
  transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     res.status(200).json({'Mail':'Mail sended successfully'});
});

})

module.exports = router;
