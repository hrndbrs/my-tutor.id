const camelCaseSeparator = require("../helpers/camelCaseSeparator")
const dateFormatter = require("../helpers/dateFormatter")
const { 
    User, 
    UserProfile, 
    Instructor, 
    InstructorProfile 
} = require("../models")

class ProfileController {
    static models = {
        tutor : { user : Instructor, profile : InstructorProfile, foreignKey : "InstructorId" },
        student : { user : User, profile : UserProfile, foreignKey : "UserId" }
    }

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
            session : { auth },
            query: { value }
        } = req

        const editMode = value === "edit" ? true : false

        

        ProfileController.models[role].user.findOne({ 
            where: { roleId : auth },
            attributes: [
                ["roleId", "id"],
                "email",
                "createdAt"
            ],
            include: { 
                model: ProfileController.models[role].profile,
                as : 'Profile',
                attributes : {
                    exclude : ["id", "createdAt", "updatedAt"]
                }
            }
        })
            .then(data => res.render(
                "dashboard/dashboard.ejs", 
                { user : data.dataValues, camelCaseSeparator, dateFormatter, auth, editMode, role }
            ))
            .catch(err => res.send(err.message))
    }

    static editUserProfile(req, res) {
        const { 
            params : { roleId },
            query : { role },
            body : {
                email,
                firstName,
                lastName,
                gender,
                education,
                description,
                occupation,
                dateOfBirth
            } 
        } = req

        ProfileController.models[role].user.update(
            { email },
            { where : { roleId }}
        )
            .then(() => ProfileController.models[role].profile.update(
                { firstName, lastName, gender, education, description, occupation, dateOfBirth },
                { where : { [ProfileController.models[role].foreignKey] : roleId}}
            ))
            .then(() => res.redirect(`/${role}/dashboard`))
            .catch(err => res.send(err.message))
    }
}

module.exports = ProfileController