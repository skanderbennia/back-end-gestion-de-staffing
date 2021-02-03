const express = require("express")
const {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    aliasUserFiveFirst,
    getUserStat,
    getMonthlyPlan
} 
= require("./../controllers/userController")
const {signup, login} = require('./../controllers/authController')
const authController = require('./../controllers/authController')

const router = express.Router()
//they are not the top but i m just naming it like that
router.route("/top-5-user")
.get(aliasUserFiveFirst,getAllUsers)

router.route("/users-stats").get(getUserStat)

//router.route("/monthly-plan").get(getMonthlyPlan)

router.post('/signup',signup)
router.post('/login',login)

router.route('/')
.get(authController.protect,authController.restrictTo("admin"),getAllUsers)
.post(createUser)

router.route("/:id")
.get(authController.protect,authController.restrictTo("admin"),getUser)
.patch(authController.protect,authController.restrictTo("admin"),updateUser)
.delete(authController.protect,authController.restrictTo("admin"),deleteUser)

module.exports = router