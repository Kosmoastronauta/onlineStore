const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../model/User');

module.exports = function (passport){
    passport.use(
        new LocalStrategy({
            usernameField: 'name'
        }, (name, password, done) => {
            try {
                const user = User.find({name: name})
                // There is no such user
                if (!user) {
                    return done(null, false, {message: 'There is no such account with that email'});
                }
                // There is, let's check password
                bcrypt.compare(password, user.password, (error, isMatch) => {
                    if (error)
                        throw error
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Invalid password'});
                    }
                });
            } catch (error) {
                console.log(error);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}