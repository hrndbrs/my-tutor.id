const { AuthController } = require("../controllers")
const { authFormRedirection } = require("../middlewares")

const router = require("express").Router()

router.get("/", authFormRedirection, AuthController.renderAuthForm)

router.post("/register", AuthController.handleRegister)
router.post("/log-in", AuthController.handleUserLogin)
router.get("/logout", AuthController.userWillLogOut)

module.exports = router