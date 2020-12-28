const express = require('express')
const{
getAllTaches,
}
=require('./../controllers/tacheController')

const authController =require('./../controllers/authController')
const router = express.Router()

router.route('/')
.get(authController.protect,getAllTaches)

module.exports = router