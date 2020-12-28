const express = require('express')
const{
getAllTaches
}
=require('./../controllers/tacheController')

const router = express.Router()

router.route('/')
.get(getAllTaches)

module.exports = router