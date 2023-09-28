const { ProfileController } = require("../controllers")

const router = require("express").Router()

router.get("/", (req, res) => {
    res.render("index")
})

router.use("/auth", require("./auth.routes"))

router.use((req, res, next) => {
    if(!req.session.auth) return res.render("/auth")

    next()
})

router.use("/profile", require("./profile.routes"))
router.get("/dashboard", ProfileController.redirect)
router.get("/:role/dashboard/", ProfileController.renderDashboard)



module.exports = router