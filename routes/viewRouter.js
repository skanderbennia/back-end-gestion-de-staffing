
const express = require('express');
const router = express.Router()
const client = require('../utils/axios')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');
const Groupe = require("../models/groupeModel")
const Tache = require("../models/tacheModel");


router.get('/admintaches',function(req,res){
  res.render("pages/adminTaches")
})
router.get('/userInterface',function(req,res){
  res.render("pages/tache")
})
router.get('/', function(req, res) {
    
    res.render('pages/login');
});
router.get('/signup', function(req, res) {
    
    res.render('pages/signup');
});
router.post('/postsignup', function(req, res) {
    const {email,password,age,nom,prenom,passwordConfirmation} = req.body
    
    client.post('/users/signup',{
      email,
      password,
      age,
      nom,
      prenom,
      passwordConfirmation
    }).then((response)=>{
     // console.log(response)
      res.redirect("/")
    }).catch((err)=>{
      console.log(err)
    })
    
    
});
 router.get('/dashboard', function(req,res){  
  res.render("pages/adminInterface")

 })
router.post('/dashboard', function(req,res){
    const {email,password} = req.body
   
    console.log(email[0],password)
    client.post('users/login', {
    email: email[0],
    password: password
  })
  .then(function (response) {
    let token
    let id
    console.log(response.data);
    if(response.data.userInformation.role === "user"){
    res.render('pages/tache',{userInformation:response.data.userInformation})
    console.log(response.data.userInformation._id)
     id = response.data.userInformation._id
     token = response.data.token
    client.get(`taches/userTache/${id}`,
    {headers: {
    'Authorization': `Bearer ${token}` 
  }})
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);


  })
}
if(response.data.userInformation.role === "admin"){
    // res.render("pages/adminInterface",{userInformation:response.data.userInformation})
    let admin = response.data.userInformation 
    id = response.data.userInformation._id
     token = response.data.token
    client.get(`/users`,
    {headers: {
    'Authorization': `Bearer ${token}` 
  }})
  .then(function (response) {
    
    console.log(response.data.data.users);
    res.render("pages/adminInterface",{users:response.data.data.users,admin:admin,token:token})

  })
  .catch(function (error) {
    console.log(error);

  })
}
  })
  .catch(function (error) {
    console.log(error);

  });
  
})
router.post("/delete",async function(req,res){
    let id = req.body.id
    let {token} = req.body
    
    
    console.log(id,token)
    client.delete(`users/${id}`,{headers: {
    'Authorization': `Bearer ${token}` 
  }}).then((response)=>{
     res.redirect("/dashboard")
    
  })
})
router.post("/modify",async function(req,res){
  const {userId} = req.body
  const user = await User.findById(userId)
  if(user){
    res.render("pages/modifierUser",{user:user})
  }
})
router.get("/addTask",function(req,res){
  res.render('pages/addTask')
})
router.get("/taskinfo/:id",async function(req,res){
  console.log(req.params.id)
  res.render("pages/invoice.ejs")
})
router.get('/profil/:idUser',async(req,res)=>{
  console.log(req.params.idUser)
  const user= await User.findById(req.params.idUser)
  console.log("user profile is here",user)
  res.render("pages/profil",{user:user})
})
router.get("/groupeList",(req,res)=>{
    res.render("pages/adminGroupe")
})
router.post("/deleteGroupe",async(req,res)=>{
  const {id,token} = req.body
  if(id&&token){
    await Groupe.findByIdAndDelete(id)
    res.render('pages/adminGroupe')
  }
})
router.post("/modifyGroupe",async(req,res)=>{
  const {id} = req.body
  if(id){
    const currentGroupe = await Groupe.findById(id)
    res.render("pages/modifierGroupe",{groupe:currentGroupe})
  }
})
// router.get("/usersInGroupe",async(req,res)=>{
//   res.render("pages/")
// })
router.get("/addGroupe",async(req,res)=>{
  res.render("pages/addGroupe")
})
router.get("/aboutTask/:id",async function(req,res){
  console.log(req.params.id)
  const currentTache = await Tache.findById(req.params.id)
  let userInTask
  console.log(currentTache)
  if(currentTache.user._id!=undefined){
 userInTask = await User.findById(currentTache.user._id)
  }
   if(currentTache.groupe._id!=undefined){
 userInTask = await Groupe.findById(currentTache.groupe._id)
  }
 
  res.render("pages/aboutTask",{tache:currentTache,user:userInTask})
  
})
router.get("/deleteTask/:id",async function(req,res){
  await Tache.findByIdAndDelete(req.params.id)
  res.redirect("http://localhost:3000/admintaches")
})
router.get("/a",function(req,res){
  res.render("pages/page")
})
module.exports = router;
