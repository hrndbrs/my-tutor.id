const { Op } = require("sequelize")
const { User, UserProfile, Instructor, InstructorProfile } = require("../models")
const { compareSync } = require("bcryptjs")
const {
    convertToThreeDigit,
    roleIdGenerator,
    slugToPascal
} = require("../helpers")


class AuthController {
    static renderAuthForm(req, res) {
        let { tab, errors } = req.query
        errors = errors?.split(",")

        if(tab === undefined) tab = "log-in"

        res.render("auth-page/auth.ejs", { tab, slugToPascal, errors })
    }

    static registrationHelper(role, entity, profile, input, req, res) {
        let key, roleId, user 

        if(role === "student") key = "UserId"
        else if(role === "tutor") key = "InstructorId"

        entity.create(input)
            .then(data => {
                user = data
                roleId = roleIdGenerator(role, convertToThreeDigit(data.id))
                return entity.update(
                    { roleId }, 
                    { where : { id : data.id } }
                )
            })
            .then(() => {
                return profile.create({ [key] : roleId})
            })
            .then(()=>{
                req.session.auth = roleId
                res.redirect("/")
            })
            .catch(err => {
                let status, errors
                if(err.name === "SequelizeUniqueConstraintError") {
                    status = 409
                    errors = ["Email address already exists"]
                }
                else if (err.name === "SequelizeValidationError") {
                    status = 400
                    errors = err.errors.map(x => x.message)
                }
                else {
                    status = 500
                    errors = ["Internal Server Error"]
                }

                res.status(status).redirect(`/auth?tab=register&errors=${errors}`)
            })
    }

    static handleRegister(req, res) {
        const { role } = req.body

        switch(role) {
            case "student" : 
                return AuthController.registrationHelper(role, User, UserProfile, req.body, req, res)
            case "tutor" :
                return AuthController.registrationHelper(role, Instructor, InstructorProfile, req.body, req, res)
            default :
                const errors = ["Please choose a role"]
                res.status(400).redirect(`/auth?tab=register&errors=${errors}`)
        }
    }

    static loginHelper(input, entity, req, res) {

        return  entity.findOne({
            where : { email : { [Op.iLike] : input.email }}
        })
            .then(user => {
                if(user){
                    if(!compareSync(input.password, user?.password)) throw new Error("Password is incorrect")

                    req.session.auth = user.roleId

                    return res.redirect("/dashboard")
                } 
                
                throw new Error("Invalid email address. User is not found")
            })
            .catch(err => res.status(401).redirect(`/auth?tab=log-in&errors=${[err.message]}`))
    }

    static handleUserLogin(req, res) {
        const { role } = req.body

        switch(role) {
            case "student" : 
                return AuthController.loginHelper(req.body, User, req, res)
            case "tutor" : 
                return AuthController.loginHelper(req.body, Instructor, req, res)
            default :
                const errors = ["Chosen role doesn't exist"]
                res.status(401).redirect(`/auth?tab=log-in&errors=${[errors]}`)
        }
    }

    static 
}

module.exports = AuthController 