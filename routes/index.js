const { ProfileController } = require("../controllers")
const { loginSessionChecker, roleChecker } = require("../middlewares")

const router = require("express").Router()

router.get("/", (req, res) => {
    res.render("index", { auth : req.session.auth })
})

router.use("/auth", require("./auth.routes"))

router.use(loginSessionChecker)

router.use("/profile", require("./profile.routes"))
router.get("/dashboard", ProfileController.redirect)
router.get("/:role/dashboard/",roleChecker , ProfileController.renderDashboard)



module.exports = router