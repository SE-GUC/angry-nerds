const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Admins = require('./../models/Admin')
<<<<<<< HEAD
<<<<<<< HEAD
const Lawyer = require('./../models/Lawyer')
const Reviewer = require('./../models/Reviewer')
=======
>>>>>>> master
const validator = require('../../validations/AdminValidations')
const Case = require('../models/Cases')
const Lawyer = require('../models/Lawyer')
const Reviewer = require('../models/Reviewer')
const fun = require('./AdminController')
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');


=======
const Case = require('./../models/Cases')
const Lawyer = require('./../models/Lawyer')
const Reviewer = require('./../models/Reviewer')
const Investor = require('./../models/Investor')
const validator = require('../../validations/AdminValidations')
"use strict";
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
>>>>>>> 6c9cf1eca2fddddd1f5055d3f9abdeac9c5a59c8

var InvestorController = require('./InvestorController')

let AdminController = {
<<<<<<< HEAD
//write your methods here: check investorController for example
<<<<<<< HEAD
=======
    //write your methods here: check investorController for example
    //write your methods here: check investorController for example
>>>>>>> 6c9cf1eca2fddddd1f5055d3f9abdeac9c5a59c8


    /* Malak
    this is a method that takes nothing as an input and calculates time
    taken for a case to be finished from a to z
    */

    AdminViewTimeToFinishCase: async function (Data) {
        const id = req.params.id
        const Cases = await Case.findById(id)
        var d1 = new Date(Cases.caseOpenSince)
        if (!Cases) {
            res.json({ msg: 'Cannot find case' })
        }
        else {
            console.log(Cases.caseClosedDate)
            if (Cases.caseClosedDate != null) {
                var d2 = new Date(Cases.caseClosedDate)
                var timeDiff = Math.abs(d2.getTime() - d1.getTime())
                var daysBetween = Math.ceil(timeDiff / (1000 * 3600 * 24))
                console.log(timeDiff)
                console.log(daysBetween)
                res.json({ data: daysBetween })
            }
            else {
                res.json({ msg: 'Case not finished' })
            }
        }
    },


    AdminDeleteInvestor: async (req, res) => {
        try {
            mongoose.set('useFindAndModify', false)
            const id = req.params.id
            const AdminId = '5c9bb0dc5185793518ea84fb' //login token
            const Investors = await Investor.findById(id)
            const Admin = await Admins.findById(AdminId)

            if (!Admin)
                return res.status(403).json({ error: 'Only Admins have access' })
            else {
                if (Investors) {
                    await InvestorController.deleteInvestor(id)
                    return res.status(200).json({ msg: 'Investor deleted successfully' })
                }
                else {
                    return res.status(400).json({ error: 'Can not find Investor' })
                }
            }

        }
        catch (error) {
            return res.status(400).json({ error: 'Can not perform this action now' })
        }
    },
    AdminRegisterReviewer: async (req, res) => {
        const AdminId = '5c9bb0dc5185793518ea84fb' //login token
        const Admin = await Admins.findById(AdminId)
        if (!Admin)
            return res.status(403).json({ error: 'Only Admins have access' })
        const email = req.body.email
        const Reviewers = await Reviewer.findOne({ email })
        if (Reviewers)
            return res.status(400).json({ error: 'Email already exists' })
        else {
            const newReviewer = await Reviewer.create(req.body)
            return res.status(200).json({ msg: 'Reviewer was created successfully', data: newReviewer })
            //  .catch(err => res.json('There was an error ,Try again later'))
        }

    },

    /*
        this method allows admins to edit company details,
        This will be used to edit info such as currency, city, name, etc...
        */
    AdminEditCompany: async function (req, res) {

        const AdminID = '5c9bb0dc5185793518ea84fb' //get this from login toked later
        const id = req.params.id //this represents the id of the case being edited

        const admin = await Admins.findById(AdminID).catch((err) => {
            res.json({ message: 'This id is not valid. please contact technical support' })
        })

        const currentCase = await Case.findById(id).catch((err) => {
            res.json({ message: 'This id is not valid. please contact technical support' })
        })



        if (currentCase) {
            if (admin) {
                const updated = await Case.findByIdAndUpdate(id, req.body)
                return res.json({
                    message: 'you have updated the Company details successfully', data: updated
                })
            }
            else {
                res.json({ message: 'you are not authorized for this action' })
            }
        }
        else {
            return res.json({
                message: 'the company you are trying to edit does not exist'
            })
        }

    },

    AdminRegisterLawyer: async (req, res) => {
        const AdminId = '5c9bb0dc5185793518ea84fb' //login token
        const Admin = await Admins.findById(AdminId)
        if (!Admin)
            return res.status(403).json({ error: 'Only Admins have access' })
        const email = req.body.email
        const Lawyers = await Lawyer.findOne({ email })
        if (Lawyers)
            return res.status(400).json({ error: 'Email already exists' })
        else {
            const newLawyer = await Lawyer.create(req.body)
            return res.status(200).json({ msg: 'Lawyer was created successfully', data: newLawyer })
            //    .catch(err => res.json('There was an error ,Try again later'))
        }

    },
    /* Malak
    This is a function that takes as an input a request, a variable (which will
    be the global variable we want to change) and a newValue (the new value
    we will set the global variable with) it check if the user is an admin 
    if yes, change the variable if not error message
    */
    AdminChangePricingStrategy: async function (req, res, variable, newValue) {
        const id = req.params.id
        const admin = await admin.findById(id)
        if (!admin) {
            res.json({ msg: 'you are not authorised to do this action' })
        }
        else {
            if (variable === revenues159) {
                revenues159 = newValue
                res.json({ msg: 'Pricing strategy changed succesfully!' })
            }
            if (variable === revenues72) {
                revenues72 = newValue
                res.json({ msg: 'Pricing strategy changed succesfully!' })
            }
            if (variable === debt159) {
                debt159 = newValue
                res.json({ msg: 'Pricing strategy changed succesfully!' })
            }
            if (variable === debt72) {
                debt72 = newValue
                res.json({ msg: 'Pricing strategy changed succesfully!' })
            }
        }
    },

    /* Malak
    this function takes Text, subject< recipient and send an email
    */

    SendEmail: async function (Text, Subject, Reciepient) {

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        // async..await is not allowed in global scope, must use a wrapper
        async function main() {

            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let account = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "angry.nerds2019@gmail.com", // generated ethereal user
                    pass: "Angry1234" // generated ethereal password
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Angry Nerds" <angry.nerds2019@gmail.com>', // sender address
                to: Recipient, // list of receivers
                subject: Subject, // Subject line
                text: Text, // plain text body
                html: Text // html body
            };

            // send mail with defined transport object
            let info = await transporter.sendMail(mailOptions)

            console.log("Message sent: %s", info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        main().catch(console.error);
    },
    AdminRegisterAdmin: async (req, res) => {
        const AdminId = '5c9bb0dc5185793518ea84fb' //login token
        const Admin = await Admins.findById(AdminId)
<<<<<<< HEAD
=======
system_assign_lawyer: async function (caseId) {
    const Cases = await Case.findById(caseId)
    const st = await Lawyer.find( { number_of_cases: 1 })
    var least = st[0].number_of_cases
    for (let i = 1; i < st.length; i += 1) {
        if (st[i].number_of_cases < least) {
            least = st[i].number_of_cases
        }
    }
    for (let i = 0; i < st.length; i += 1) {
        if (st[i].number_of_cases === least) {
            fun.admin_assign_lawyer(caseId, st[i]._id)
            break;
        }
    }
},

admin_assign_lawyer : async function (caseId, lawyerId) {
    const updatedCase = await Case.findByIdAndUpdate(caseId, { 'lawyerID': lawyerId })
    const st = await Lawyer.findById(lawyerId)
    const updatedLawyer1 = await Lawyer.findByIdAndUpdate(lawyerId, { 'total_number_of_cases': st.total_number_of_cases + 1 })
    const updatedLawyer2 = await Lawyer.findByIdAndUpdate(lawyerId, { 'number_of_cases': st.number_of_cases + 1 })
},

system_assign_reviewer : async function (caseId) {
    const st = await Reviewer.find({ number_of_cases: 1 })
    var least = st[0].number_of_cases
    for (let i = 1; i < st.length; i += 1) {
        if (st[i].number_of_cases < least) {
            least = st[i].number_of_cases
        }
    }
    for (let i = 0; i < st.length; i += 1) {
        if (st[i].number_of_cases === least) {
            fun.admin_assign_reviewer(caseId, st[i]._id)
            break;
        }
    }
},

admin_assign_reviewer : async function (caseId, reviewerId) {
    const updatedCase = await Case.findByIdAndUpdate(caseId, { 'reviewerID': reviewerId })
    const st = await Reviewer.findById(reviewerId)
    const updatedLawyer1 = await Reviewer.findByIdAndUpdate(reviewerId, { 'total_number_of_cases': st.total_number_of_cases + 1 })
    const updatedLawyer2 = await Reviewer.findByIdAndUpdate(reviewerId, { 'number_of_cases': st.number_of_cases + 1 })

},

forgotpassword: async  (mail)=> {
    //var userEmail = req.body.email;
    var userEmail = mail
    Admins.findOne({ email: userEmail }, function (err, user) {
        if (err) {
            res.json({ success: false, message: err.message });
        }
        else if (!user) {
            res.json({ success: false, message: "incorrect email" });
        }
        else {

            var token = jwt.sign({
                _id: Admins._id,
                FName: user.FName
            }, 'secret', {expiresIn: 60 }); //seconds
            
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'angry.nerds2019@gmail.com',
                    pass: 'Angry1234'
                }
 
            });
            let mailOptions = {
                from: '"Angry Nerds 👻" <angry.nerds2019@gmail.com>', // sender address
                to: userEmail, // list of receivers
                subject: 'Resetting Password', // Subject line
                text: 'reset Link expires in 24 hours', // plain text body
                html: '<h3>The code expires within an hour</h3> <br> <p>Click <a href="http://localhost:3000/resetpass/' + token + '">here</a> to reset your password</p>'
                // html body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                user.token = token;
                user.save();
                res.json({ success: true, message: 'An email has been sent check your email' });
            });
        }
    });
 },

 resetpassword : function  (req, res) {
            var userToken =  req.params.token;
            var newPassword = req.body.password;
            Admins.findOne({ token: userToken }, function (err, user) {
                if (err) {
                    res.json({ success: false, message: "Token is expired please try again" });
                }
                else {
                    if ((Date.now()-user.token_date) > 60*60*1000){
                        res.json({ success: false, message: "Token is expired please try again" });
                    }
                    else{
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(newPassword, salt, function (err, hash) {
                                user.password = hash;
                                user.save(function (err) {
                                    if (err) {
                                        res.json({ success: false, message: err.message });
                                        console.log(err);
                                    }
                                    else {
                                        res.json({ success: true, message: "Password reseted succesfully" });
                                    }
                                });
                            });
                        });
                    }
                }
            });
 }
>>>>>>> master
=======
        if ((!Admin) || (Admin && Admin.Type !== 'Super'))
            return res.status(403).json({ error: 'Only syuper admins have access' })
        const email = req.body.email
        const checkAdmin = await Admins.findOne({ email })
        if (checkAdmin)
            return res.status(400).json({ error: 'Email already exists' })
        else {
            if (req.body.Type !== 'Admin')
                return res.status(400).json({ error: 'Type should be only Admin' })
            const newAdmin = await Admins.create(req.body)
            return res.status(200).json({ msg: 'Admin was created successfully', data: newAdmin })
            //   .catch(err => res.json('There was an error ,Try again later'))
        }

    },
    AdminDeleteAdmin: async (req, res) => {
        try {
            mongoose.set('useFindAndModify', false)
            const id = req.params.id
            const AdminId = '5c9bb0dc5185793518ea84fb' //login token
            const Admin = await Admins.findById(AdminId)

            if ((!Admin) || (Admin && Admin.Type !== 'Super'))
                return res.status(403).json({ error: 'Only Admins have access' })
            else {
                await Admins.findByIdAndRemove(id)
                return res.status(200).json({ msg: 'Admin deleted successfully' })
            }

        }
        catch (error) {
            return res.status(400).json({ error: 'Can not perform this action now' })

        }
    },


    adminViewComment: async (req, res) => {
        try {
            const formid = '5c9cfd1d05f1d42e68b75fb7'
            const adminid = '5c77e91b3fd76231ecbf04ee'
            const admin = await Admins.findById(adminid)
            const form = await Case.findById(formid)
            if (!form)
                return res.status(404).send({ error: 'The form does not exist' });
            if (!admin)
                return res.status(404).send({ error: 'You are not allowed to view this comment' });
            return res.json({ data: form.comment });
        }
        catch (error) {
            return res.status(404).send({ error: 'Comment cant be viewed' })

        }


    },



    /*
    PUT request to change password of the admin
    PARAMS:{ adminID: String }
    BODY:{   oldPassword: String,
             newPassword: String }
    * Checks if the admin is in the database,
    then checks if the oldPassword matches the one in the database.
    Then changes the password in the database.     
    RETURNS 404 NOT FOUND: if the ID is not in the database.
            403 FORBIDDEN: if the old password does not match the password in the database.
            200 OK: if the password is updated.
            400 BAD REQUEST: if an exception is thrown.   

    */
    adminChangePassword: async function (req, res) {
        try {
            const id = req.params.id
            const oldPassword = req.body.oldPassword
            const newPassword = req.body.newPassword
            let admin = await Admins.findById(id)
            if (!admin) {
                return res.status(404).json({ error: 'Cannot find an admin account with this ID' })
            }
            else {
                if (oldPassword != admin.password) {
                    return res.status(403).json({ error: 'The passwords do not match' })
                }
                else {
                    const updatedAdmin = await Admins.findByIdAndUpdate(id, {
                        'password': newPassword,
                    })
                    admin = await Admin.findById(id)
                    return res.status(200).json({ msg: 'The password was updated', data: admin })
                }
            }
        }
        catch (error) {
            console.log(error)
            return res.status(400).json({ error: 'Error processing query.' })
        }

    },

    adminViewLawyersLeaderBoard: async (req, res) => {
        try {
            const adminid = '5c9e48bb3f08ad4ea807ea10'
            const admin = await Admin.findById(adminid)
            if (!admin)
                return res.status(404).send({ error: 'You are not allowed to view the Leaderboard' });
            const leaderboard = await Lawyer.find().sort({ completed_number_of_cases: 1 });

            return res.json({ data: leaderboard });



        }
        catch (error) {
            console.log(error)
            return res.status(404).send({ error: 'LeaderBoard cant be viewed' })

        }
    },

    adminViewReviewersLeaderBoard: async (req, res) => {
        try {
            const adminid = '5c9e48bb3f08ad4ea807ea10'
            const admin = await Admin.findById(adminid)
            if (!admin)
                return res.status(404).send({ error: 'You are not allowed to view the Leaderboard' });
            const leaderboard = await Reviewer.find().sort({ completed_number_of_cases: 1 });

            return res.json({ data: leaderboard });



        }
        catch (error) {
            console.log(error)
            return res.status(404).send({ error: 'LeaderBoard cant be viewed' })

        }
    },


>>>>>>> 6c9cf1eca2fddddd1f5055d3f9abdeac9c5a59c8


}

<<<<<<< HEAD
}
<<<<<<< HEAD
=======
>>>>>>> master
module.exports = AdminController
=======

module.exports = AdminController
>>>>>>> 6c9cf1eca2fddddd1f5055d3f9abdeac9c5a59c8
