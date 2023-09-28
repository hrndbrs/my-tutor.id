require("dotenv").config()
const express = require("express")
const session = require("express-session")

const app = express()
const port = process.env.PORT

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended : true }))
app.use(session({
    key: "id",
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 5,
    }
}))

app.use(require("./routes"))


app.listen(port, () => {
    console.log("port is up", port)
})