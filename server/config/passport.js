const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../model/User');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({
            username: 'username'
        }, (username, password, done) => {

            // Match user
            User.findOne({
                username: username
            }).then(user => {
                if (!user) {
                    return done(null, false, {message: 'There is no such username.'});
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err)
                        throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Invalid Password.'});
                    }
                });
            });
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