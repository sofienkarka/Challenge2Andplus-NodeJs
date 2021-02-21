const { models } = require('mongoose');
var express = require('express');
var Users=require('../Schemas/Users')
var router = express.Router();
const nodemailer = require('nodemailer');
const fs=require('fs');
const path=require('path');
const ejs=require('ejs');


router.get('/Mail',async (req, res, next)=> {

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
    //load html template with mail API(fs:chargement de la page, path:le lien de chargement,ejs:chargement dans le JS)
    const template=fs.readFileSync(path.resolve('./html templates','mail_template.html'),{encoding:'utf-8'})
    const html= ejs.render(template,{name:found[i].email}) 
    const mailOptions = {
    
  from: 'sofien.gallas@gmail.com',
  to: found[i].email,
  subject: 'Invoices due',
  html: html
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
