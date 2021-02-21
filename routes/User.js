var express = require('express');
var router = express.Router();
var Users=require('../Schemas/User')
const jwt=require('jsonwebtoken')

router.post('/User', async(req,res)=>{
  await Users.create(req.body)
    res.json({
        message:'User added succufuly'
    })
})

router.get('/User',async(req,res)=>{
   const found= await Users.findOne({email:req.body.email,password:req.body.password});
   if(found){ 
       //create jwt token
const data={
    email:found.email,
    id:found._id
}
const createToken=jwt.sign(data,'secret',{expiresIn:"1d"});
//send response
   res.json({
       message:'login succufully',token:createToken
   })
}
    else{
       
       return res.status(400).json({message:"Email ou mot de passe incorret"})
    }
})



module.exports = router;
