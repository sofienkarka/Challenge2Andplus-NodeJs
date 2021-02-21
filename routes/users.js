var express = require('express');
var router = express.Router();
var Users=require('../Schemas/Users')
const passport=require('passport')

var Todos=require('../Schemas/Todos')
/* GET users listing. */
router.get('/Users/:id',passport.authenticate('bearer',{session:false}),async (req, res, next)=> {
  const found=await Users.findById(req.params.id).populate('todos')
  res.json(found.email);
});
router.post('/Users',passport.authenticate('bearer',{session:false}),async(req,res)=>{
  await Users.create(req.body);
  res.json({message:"User crée avec succes"});
})
// router.post('/Users/:userid/:todoid',async (req, res) => {
//   const todo=await Todos.findById(req.params.todoid);
//  const NewUser=await Users.findByIdAndUpdate(req.params.userid,{$push:{todos:todo._id}})
//   console.log(NewUser);
//   res.json(NewUser)
// })
router.put('/Users/:userid/:todoid',passport.authenticate('bearer',{session:false}),async(req,res)=>{
  const todo=await (await Todos.findById(req.params.todoid));
 const NewUser=await Users.findByIdAndUpdate(req.params.userid,{$pull:{todos:todo._id}})
  console.log(NewUser);
  res.json(NewUser)
})
router.delete('/Users/:id',passport.authenticate('bearer',{session:false}), async(req,res)=>{
  await Users.findByIdAndDelete(req.params.id)
  res.json({message:'Object surppimé avec succes'})
})
// router.put('/Users/:id',async(req,res)=>{
//  const Updated= await Users.findByIdAndUpdate(req.params.id, req.body,{new:true})
//  res.json(Updated)
//  console.log(Updated);
// })

module.exports = router;
