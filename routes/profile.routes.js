const { ProfileController } = require("../controllers")

const router = require("express").Router()

router.get("/", ProfileController)

module.exports = router