const express = require('express'),
      router = express.Router(),
      nodeMailer = require('nodemailer');

router.post('/', function(req, res) {
  let transporter = nodeMailer.createTransport({
    service: 'outlook',
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });

  // setup email data with unicode symbols
  const sender = req.body.name+' '+req.body.surname;
  let mailOptions = {
      from: req.body.mail, // sender address
      to: 'david.swiatkiewiez@gmail.com', // list of receivers
      subject: 'Nouveau message envoyé depuis mon portfolio par '+ sender, // Subject line
      text: req.body.message +'\n'+'\n'+'Adresse mail de '+sender+': '+ req.body.mail,
  };

  transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     res.status(200).json({'Mail':'Mail sended successfully'});
});

})

module.exports = router;
