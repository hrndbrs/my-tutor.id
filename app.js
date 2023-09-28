require("dotenv").config()
const express = require("express")
const session = require("express-session")
const path = require("path")

const app = express()
const port = process.env.PORT

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "assets")))
app.use(express.urlencoded({ extended : true }))
app.use(express.json())
app.use(session({
    key: "auth",
    secret: process.env.ACCESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true,
        maxAge: 1000 * 60 * 30,
    }
}))

app.use(require("./routes"))


app.listen(port, () => {
    console.log("port is up", port)
})