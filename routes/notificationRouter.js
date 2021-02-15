const express = require("express")
const {
       getAllNotification,
       deleteNotification,
       deleteAllNotification
} = require("../controllers/notificationController")
const router = express.Router()
const authController = require("../controllers/authController")
router.route("/")
.get(authController.protect,authController.restrictTo("admin"),getAllNotification)
.delete(authController.protect,authController.restrictTo("admin"),deleteAllNotification)
router.route('/:id').delete(deleteNotification)
module.exports = router