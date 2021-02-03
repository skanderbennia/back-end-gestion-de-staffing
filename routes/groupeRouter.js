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
const authController = require("../controllers/authController")
const router  = express.Router()

router.route('/')
.get(authController.protect,authController.restrictTo("admin"),getAllGroupes)
.post(authController.protect,authController.restrictTo("admin"),createGroupe)

router.route('/:id')
.get(authController.protect,authController.restrictTo("admin"),getGroupe)
.patch(authController.protect,authController.restrictTo("admin"),updateGroupe)
.delete(authController.protect,authController.restrictTo("admin"),deleteGroupe)



router.route('/:idGroupe/user/:idUser')
.post(authController.protect,authController.restrictTo("admin"),AddMemberGroupe)
.patch(authController.protect,authController.restrictTo("admin"),deleteOneMember)

module.exports = router