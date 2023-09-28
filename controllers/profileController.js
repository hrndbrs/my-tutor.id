const { User, UserProfile, Instructor, InstructorProfile } = require("../models")

class ProfileController {
    static redirect(req, res) {
        const { auth } = req.session

        const url = auth[0] === "T" 
            ? "/tutor/dashboard" : auth[0] === "S"
            ? "/student/dashboard" : "/" 

        res.redirect(url)
    }

    static renderDashboard(req, res) {
        const { 
            params : { role },
            session : { auth }
        } = req

        const models = {
            tutor : { user : Instructor, profile : InstructorProfile},
            student : { user : User, profile : UserProfile }
        }

        models[role].user.findOne({ 
            where: { roleId : auth },
            include: { model: models[role].profile }
        })
            .then(data => res.send(data))
            .catch(err => res.send(err))
    }

    static renderEditProfile(req, res) {

    }
}

module.exports = ProfileController