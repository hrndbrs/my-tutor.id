module.exports = {
    loginSessionChecker : (req, res, next) => {
        if(!req.session.auth) return res.redirect("/auth")
        next()
    },

    roleChecker : (req, res, next) => {
        const { 
            params : { role },
            session : { auth }
        } = req

        const roles = {
            T : "tutor",
            S : "student"
        }

        if(role !== roles[auth[0]]) return res.redirect("/")

        next()
    },

    authFormRedirection : (req, res, next) => {
        if(req.query.tab && !["register", "log-in"].includes(req.query.tab))return res.redirect("/auth")
    
        next()
    }
}