const { ProfileController } = require("../controllers")

const router = require("express").Router()

router.post("/edit/:roleId", ProfileController.editUserProfile)

module.exports = router