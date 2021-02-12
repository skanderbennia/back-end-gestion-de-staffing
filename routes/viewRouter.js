
const express = require('express');
const router = express.Router()
const client = require('../utils/axios')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');
const { json } = require('body-parser');

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
module.exports = router;