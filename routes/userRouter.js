const express = require("express")
const {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    aliasUserFiveFirst
} 
= require("./../controllers/userController")





const router = express.Router()
//they are not the top but i m just naming it like that
router.route("/top-5-user")
.get(aliasUserFiveFirst,getAllUsers)


router.route('/')
.get(getAllUsers)
.post(createUser)

router.route("/:id")
.get(getUser)
.patch(updateUser)
.delete(deleteUser)

module.exports = router