const Role = require('../config/role');
module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/users/login');
    },
    ensureAdminAuthenticated: (req, res, next) => {
        if (req.isAuthenticated() && req.user.role == Role.Admin)
            return next();
        res.redirect('/users/login');
    }
}
