const { ProfileController } = require("../controllers")

const router = require("express").Router()

router.get("/", (req, res) => {
    res.render("index", { auth : req.session.auth })
})

router.use("/auth", require("./auth.routes"))

router.use((req, res, next) => {
    if(!req.session.auth) return res.redirect("/auth")

    next()
})

router.use("/profile", require("./profile.routes"))
router.get("/dashboard", ProfileController.redirect)
router.get("/:role/dashboard/", ProfileController.renderDashboard)



module.exports = router