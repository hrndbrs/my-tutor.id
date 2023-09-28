const { AuthController } = require("../controllers")
const { authFormRedirection } = require("../middlewares")

const router = require("express").Router()

router.get("/logout", AuthController.userWillLogOut)

router.use(authFormRedirection)

router.get("/", AuthController.renderAuthForm)
router.post("/register", AuthController.handleRegister)
router.post("/log-in", AuthController.handleUserLogin)

module.exports = router