const passport = require('passport');
const db = require("../models");
const User = db.user;

passport.serializeUser( (user, done) => {
    if(!user.id){
        return done(new Error("User has no id."))
    }
    done(null, user.id);
});

passport.deserializeUser( (userId, done) => {
    User.findOne({
        where: {
            id: userId
        }
    }).then((user) => {
        if(!user){
            return done(new Error("User does not exist"))
        }
        done(null, user)
    }).catch((err) => {
        done(err)
    })
});

module.exports = passport;