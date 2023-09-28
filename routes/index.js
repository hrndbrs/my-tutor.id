const router = require("express").Router()

router.use("/auth", require("./auth.routes"))

router.get("/", (req, res) => {
    // res.redirect("/auth")
    res.render("index")
})

module.exports = router