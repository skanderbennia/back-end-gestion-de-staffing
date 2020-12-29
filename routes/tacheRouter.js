const express = require('express')
const{
getAllTaches,
getTachesByUser,
createTache,
updateTache,
terminerTache
}
=require('./../controllers/tacheController')

const authController =require('./../controllers/authController')
const router = express.Router()
//without jwt
router.route('/')
.get(getAllTaches)
.post(createTache)
router.route('/userTache/:id')
.get(getTachesByUser)
router.route('/:id')
.patch(updateTache)
router.route('/terminerTache/:id')
.patch(terminerTache)

module.exports = router