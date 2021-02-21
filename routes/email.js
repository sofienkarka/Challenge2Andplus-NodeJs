const { models } = require('mongoose');
var express = require('express');
var Users=require('../Schemas/Users')
var router = express.Router();
const nodemailer = require('nodemailer');


router.get('/Users',async (req, res, next)=> {

    const found=await Users.find()
    res.json(found);
    console.log(found);
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sofien.gallas@gmail.com',
    pass: 'G119al97' // naturally, replace both with your real credentials or an application-specific password
  }
});
for(let i=0;i<found.length;i++){
const mailOptions = {
    
  from: 'sofien.gallas@gmail.com',
  to: found[i].email,
  subject: 'Invoices due',
  text: 'Dudes, we really need your money.'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
});
module.exports = router;
