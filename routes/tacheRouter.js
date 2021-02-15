const express = require('express')
const{
getAllTaches,
getTachesByUser,
createTache,
updateTache,
terminerTache,
affecterTache,
getAllUnDoneTaches
}
=require('./../controllers/tacheController')
const authController = require('../controllers/authController')


const router = express.Router()
//without jwt
router.route('/')
.get(authController.protect,authController.restrictTo("admin"),getAllUnDoneTaches)
.post(authController.protect,authController.restrictTo("admin"),createTache)
router.route('/userTache/:id')
.get(authController.protect,getTachesByUser)
router.route('/:id')
.patch(authController.protect,authController.restrictTo("admin"),updateTache)
router.route('/terminerTache/:id')
.patch(authController.protect,terminerTache)
//affecter un utilisateur a une tache spécifique
router.route('/:tacheId/user/:userId')
.patch(affecterTache)

module.exports = router