const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const tokenKey = require('./key').secretOrKey
const Investor = require('../app/models/Investor');
const Admin = require('../app/models/Admin');
const Reviewer = require('../app/models/Reviewer');
const Lawyer = require('../app/models/Lawyer');

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = tokenKey

module.exports = passport => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        
        const investor = await Investor.findById(jwt_payload.id)
        if (investor){
            return done(null,jwt_payload)
        }else  {
            const lawyer = await Lawyer.findById(jwt_payload.id)
            if (lawyer){
                return done(null,jwt_payload)
            }else{
                const reviewer = await Reviewer.findById(jwt_payload.id)
                if (reviewer){
                    return done(null,jwt_payload)
                }else{
                    const admin = await Admin.findById(jwt_payload.id)
                    if (admin){
                        return done(null,jwt_payload)
                    }else{
                        return done(null,false)
                    }
                }
            }
        }

    }))
}