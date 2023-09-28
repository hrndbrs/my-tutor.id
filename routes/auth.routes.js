const { AuthController } = require("../controllers")

const router = require("express").Router()

router.get("/", (req, res, next) => {
    if(req.query.tab && !["register", "log-in"].includes(req.query.tab))return res.redirect("/auth")

    next()
}, AuthController.renderAuthForm)

router.post("/register", AuthController.handleRegister)
router.post("/log-in", AuthController.handleUserLogin)

module.exports = router