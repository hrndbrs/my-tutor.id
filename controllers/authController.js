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
        let { tab } = req.query
        if(tab === undefined) tab = "log-in"

        res.render("auth-page/auth.ejs", { tab, slugToPascal })
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
                req.session.user = roleId
                res.send(user)
            })
            .catch(err => {
                if(err.name === "SequelizeUniqueConstraintError") return res
                    .status(409)
                    .json({errors : ["Email address already exists"]})
                else if (err.name === "SequelizeValidationError") return res
                    .status(400)
                    .json({errors : err.errors.map(x => x.message)})
                res.status(500).json({errors : ["Internal Server Error"]})
            })
    }

    static loginHelper(input, entity, req, res) {

        return  entity.findOne({
            where : { email : { [Op.iLike] : input.email }}
        })
            .then(user => {
                if(!compareSync(input.password, user?.password)) throw new Error("Password is incorrect")
                req.session.user = user.roleId
                res.send({isLoggedIn : true, user : req.session.user})
            })
            .catch(err => res.status(401).json({errors : [err.message]}))
    }

    static handleRegister(req, res) {
        const { role } = req.body

        switch(role) {
            case "student" : 
                return AuthController.registrationHelper(role, User, UserProfile, req.body, req, res)
            case "tutor" :
                return AuthController.registrationHelper(role, Instructor, InstructorProfile, req.body, req, res)
            default :
                res.status(400).json({errors : ["Bad request"]})
        }
    }

    static handleUserLogin(req, res) {
        const { role } = req.body

        switch(role) {
            case "student" : 
                return AuthController.loginHelper(req.body, User, req, res)
            case "tutor" : 
                return AuthController.loginHelper(req.body, Instructor, req, res)
            default :
                res.status(401).json({errors : ["Chosen role doesn't exist"]})
        }
    }

    static loginSession(req, res) {
        console.log(req.session, 82)
        if(!req.session.user) return res.send({ isLoggedIn : false })

        res.send({isLoggedIn : true, user : req.session.user})
    }

    static removeCookie(req, res) {
        res.clearCookie()
    }
}

module.exports = AuthController 