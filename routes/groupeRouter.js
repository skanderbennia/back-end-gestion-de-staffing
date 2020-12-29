const express = require("express")

const {
    getAllGroupes,
    createGroupe,
    getGroupe,
    updateGroupe,
    deleteGroupe,
    AddMemberGroupe,
    getMemberFromGroupe,
    deleteOneMember
}=require("./../controllers/groupeController")

const router  = express.Router()

router.route('/')
.get(getAllGroupes)
.post(createGroupe)

router.route('/:id')
.get(getGroupe)
.patch(updateGroupe)
.delete(deleteGroupe)



router.route('/:idGroupe/user/:idUser')
.post(AddMemberGroupe)
.patch(deleteOneMember)

module.exports = router