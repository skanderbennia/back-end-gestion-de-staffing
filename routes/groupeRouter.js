const express = require("express")

const {
    getAllGroupes,
    createGroupe,
    getGroupe,
    updateGroupe,
    deleteGroupe
}=require("./../controllers/groupeController")

const router  = express.Router()

router.route('/')
.get(getAllGroupes)
.post(createGroupe)

router.route('/:id')
.get(getGroupe)
.patch(updateGroupe)
.delete(deleteGroupe)

module.exports = router