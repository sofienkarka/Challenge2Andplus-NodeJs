const express = require('express');
var multer = require('multer');
var router = express.Router();
const Image=require('../Schemas/image')
const passport=require('passport')

const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadFolder = path.join(__dirname, '../uploads/');
        // console.log(uploadFolder);
        cb(null, uploadFolder);
      },
    filename: async(req, file, cb) => {
     
        const fileName  =  Date.now() +  path.extname(file.originalname);
        const image=new Image({
            image: fileName
        })
        await image.save()
        // console.log(fileName);
      cb(null, fileName);
    }
  });
  const uploads = multer({ storage: storage })

router.post('/upload',[passport.authenticate('bearer',{session:false}),uploads.array('image',12)],async (req,res)=>{
images=[]
req.files.forEach(element=>{
    images.push(element.path)

})
const image = new Image()
image.image=images
console.log(image);
await image.save()
    res.json({message:"file uploaded succuffully"})
  })

module.exports = router;

  