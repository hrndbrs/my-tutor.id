const { AuthController } = require("../controllers")

const router = require("express").Router()

router.get("/", AuthController.renderAuthForm)

module.exports = router