const express = require("express")
const {
    getAllAdmins,
    createAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin
} 
= require("./../controllers/adminController")

const router = express.Router()

router.route('/')
.get(getAllAdmins)
.post(createAdmin)

router.route("/:id")
.get(getAdmin)
.patch(updateAdmin)
.delete(deleteAdmin)

module.exports = router