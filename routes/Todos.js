var express = require('express');
var router = express.Router();
const passport=require('passport')
var Todos=require('../Schemas/Todos')
/* GET users listing. */
router.get('/Todos',passport.authenticate('bearer',{session:false}),async (req, res, next)=> {
  const found=await Todos.find()
  res.json(found);
});
router.post('/Todos',passport.authenticate('bearer',{session:false}),async (req, res) => {
  console.log(req.body);
  const NewTodo=await Todos.create(req.body);
  console.log(NewTodo);
  res.json(NewTodo)
})
router.delete('/Todos/:id',passport.authenticate('bearer',{session:false}), async(req,res)=>{
  await Todos.findByIdAndDelete(req.params.id)
  res.json({message:'Object surppimé avec succes'})
})
router.put('/Todos/:id',passport.authenticate('bearer',{session:false}),async(req,res)=>{
 const Updated= await Todos.findByIdAndUpdate(req.params.id, req.body,{new:true})
 res.json(Updated)
 console.log(Updated);
})

module.exports = router;
