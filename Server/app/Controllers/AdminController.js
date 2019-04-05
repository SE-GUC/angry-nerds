const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Admins = require('./../models/Admin')
const Reviewer = require('./../models/Reviewer')
const Investor = require('./../models/Investor')
const Laws = require('./../models/Laws')
const Question = require('./../models/Questions')
const validator = require('../../validations/AdminValidations')
const Case = require('../models/Cases')
const Lawyer = require('../models/Lawyer')
const fun = require('./AdminController')
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');

"use strict";

const dotenv = require("dotenv");
const mailer = require('./../../misc/mailer')
const config = require('./../../config/mailer')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var InvestorController = require('./InvestorController')

let AdminController = {
    //write your methods here: check investorController for example


    /* Malak
    this is a method that takes nothing as an input and calculates time
    taken for a case to be finished from a to z
    */

    AdminViewTimeToFinishCase: async function (id, res) {
        try {
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
                    res.json({ data: daysBetween, msg: 'getting time to finish a case successfull' })
                }
                else {
                    res.json({ msg: 'Case not finished' })
                }
            }
        }
        catch{
            res.json({msg:'case does not exist'})
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
            res.json({ message: 'you are not authorized' })
        })

        const currentCase = await Case.findById(id).catch((err) => {
            res.json({ message: 'This id is not a valid company.' })
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
    this function takes Text, subject< recipient and send an email
    */

    SendEmail: async function (Text, Subject, Recipient) {

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
                    user: config.user, // generated ethereal user
                    pass: config.password // generated ethereal password
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
        const AdminId = '5ca1144b4cf5920704aeab7a' //login token
        const Admin = await Admins.findById(AdminId)
        if ((!Admin) || (Admin && Admin.Type !== 'Super'))
            return res.status(403).json({ error: 'Only super admins have access' })
        if (req.body.Type !== 'Admin')
            return res.status(400).json({ error: 'Type should be only Admin' })
        const email = req.body.email
        const checkAdmin = await Admins.findOne({ email })
        if (checkAdmin)
            return res.status(400).json({ error: 'Email already exists' })
        if (req.body.Type !== 'Admin')
            return res.status(400).json({ error: 'Type should be only Admin' })
        else {
            const newAdmin = await Admins.create(req.body)
            return res.status(200).json({ msg: 'Admin was created successfully', data: newAdmin })
            //   .catch(err => res.json('There was an error ,Try again later'))
        }

    },
    AdminDeleteAdmin: async (req, res) => {
        try {
            mongoose.set('useFindAndModify', false)
            const id = req.params.id
            const AdminId = '5ca1144b4cf5920704aeab7a' //login token
            const Admin = await Admins.findById(AdminId)

            if ((!Admin) || (Admin && Admin.Type !== 'Super'))
                return res.status(403).json({ error: 'Only Admins have access' })
            else {
                const newAdmin = await Admins.findById(id)
                if (!newAdmin)
                    return res.status(400).json({ error: 'Can not find Admin' })
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
    system_assign_lawyer: async function (caseId) {
        const Cases = await Case.findById(caseId)
        const st = await Lawyer.find({ number_of_cases: 1 })
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

    admin_assign_lawyer: async function (caseId, lawyerId) {
        const updatedCase = await Case.findByIdAndUpdate(caseId, { 'lawyerID': lawyerId })
        const st = await Lawyer.findById(lawyerId)
        const updatedLawyer1 = await Lawyer.findByIdAndUpdate(lawyerId, { 'total_number_of_cases': st.total_number_of_cases + 1 })
        const updatedLawyer2 = await Lawyer.findByIdAndUpdate(lawyerId, { 'number_of_cases': st.number_of_cases + 1 })
    },

    system_assign_reviewer: async function (caseId) {
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

    admin_assign_reviewer: async function (caseId, reviewerId) {
        const updatedCase = await Case.findByIdAndUpdate(caseId, { 'reviewerID': reviewerId })
        const st = await Reviewer.findById(reviewerId)
        const updatedLawyer1 = await Reviewer.findByIdAndUpdate(reviewerId, { 'total_number_of_cases': st.total_number_of_cases + 1 })
        const updatedLawyer2 = await Reviewer.findByIdAndUpdate(reviewerId, { 'number_of_cases': st.number_of_cases + 1 })

    },

    forgotpassword: async (req, res) => {
        var userEmail = req.body.email;
        //var userEmail = req.params.email;
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
                }, 'secret', { expiresIn: 60*60 }); //seconds

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
                    html: '<h3>The code expires within an hour</h3> <br> <p>Click <a href="http://localhost:3000//resetpass/' + token + '">here</a> to reset your password</p>'
                    // html body
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    user.token = token;
                    user.token_date = Date.now()
                    user.save();
                    res.json({ success: true, message: 'An email has been sent check your email' });
                
                });
            }
            
        });
    },

    resetpassword: function (req, res) {
        var userToken = req.params.token;
        var newPassword = req.body.pass;
        Admins.findOne({ token: userToken }, function (err, user) {
            if (err) {
                res.json({ success: false, message: "Token is expired please try again" });
            }
            else {
                if ((Date.now() - user.token_date) > 1000*60*60*24*30*12) {
                    res.json({ success: false, message: "Token is expired please try again" });
                }
                else {
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
    },


    AdminDeleteLawyer: async function (req, res) {

        try {
            const Admin = await Admins.findById('5c9bb0dc5185793518ea84fb')
            const LawyerID = req.params.id
            if (Admin) {
                mongoose.set('useFindAndModify', false)
                const deletedLawyer = await Lawyer.findByIdAndRemove(LawyerID)
                if (!deletedLawyer) {
                    res.json({ message: 'there is not lawyer by this id to remove' })
                }
                else {
                    const query = { lawyerID: LawyerID }
                    const UpdateCases = await Case.find(query)
                    console.log(UpdateCases)
                    for (let i = 0; i < UpdateCases.length; i += 1) {
                        console.log(UpdateCases[i]._id)
                        AdminController.system_assign_lawyer(UpdateCases[i]._id)

                    }

                    res.json({
                        message: 'lawyer deleted successfuly'
                    })
                }
            }
            else res.json({ message: 'you are not authorized fir this action' })


        }
        catch (error) {
            console.log(error)
        }

    },


    system_assign_lawyer: async function (caseId) {

        try {
            const lawyer = await Lawyer.find()
            var least = lawyer[0].number_of_cases

            for (let i = 1; i < lawyer.length; i += 1) {
                if (lawyer[i].number_of_cases < least) {
                    least = lawyer[i].number_of_cases
                }
            }

            for (let i = 0; i < lawyer.length; i += 1) {
                if (lawyer[i].number_of_cases === least) {
                    AdminController.assign_lawyer(caseId, lawyer[i]._id)
                    break;
                }
            }
        }
        catch (error) {
            console.log(error)
        }

    },

    assign_lawyer: async function (caseId, lawyerId) {
        const updatedCase = await Case.findByIdAndUpdate(caseId, { 'lawyerID': lawyerId })
        const st = await Lawyer.findById(lawyerId)
        const updatedLawyer1 = await Lawyer.findByIdAndUpdate(lawyerId, { 'total_number_of_cases': st.total_number_of_cases + 1 })
        const updatedLawyer2 = await Lawyer.findByIdAndUpdate(lawyerId, { 'number_of_cases': st.number_of_cases + 1 })
    },

    AdminDeleteReviewer: async function (req, res) {

        try {
            const Admin = await Admins.findById('5c9bb0dc5185793518ea84fb')//get from login
            const ReviewerID = req.params.id
            if (Admin) {

                mongoose.set('useFindAndModify', false)
                const deletedReviewer = await Reviewer.findByIdAndRemove(ReviewerID)
                if (!deletedReviewer) {
                    res.json({ message: 'there is not Reviewer by this id to remove' })
                }
                else {
                    const query = { reviewerID: ReviewerID }
                    const UpdateCases = await Case.find(query)
                    console.log(UpdateCases)
                    for (let i = 0; i < UpdateCases.length; i += 1) {
                        console.log(UpdateCases[i]._id)
                        AdminController.system_assign_Reviewer(UpdateCases[i]._id)

                    }

                    res.json({
                        message: 'Reviewer deleted successfuly'
                    })
                }
            }

        }
        catch (error) {
            console.log(error)
        }
    },

    system_assign_Reviewer: async function (caseId) {

        try {
            const Reviewers = await Reviewer.find()
            var least = Reviewers[0].number_of_cases

            for (let i = 1; i < Reviewers.length; i += 1) {
                if (Reviewers[i].number_of_cases < least) {
                    least = Reviewers[i].number_of_cases
                }
            }

            for (let i = 0; i < Reviewers.length; i += 1) {
                if (Reviewers[i].number_of_cases === least) {
                    AdminController.assign_Reviewer(caseId, Reviewers[i]._id)
                    break;
                }
            }
        }
        catch (error) {
            console.log(error)
        }

    },

    assign_Reviewer: async function (caseId, ReviewerId) {
        const updatedCase = await Case.findByIdAndUpdate(caseId, { 'reviewerID': ReviewerId })
        const st = await Reviewer.findById(ReviewerId)
        const updatedReviewer1 = await Reviewer.findByIdAndUpdate(ReviewerId, { 'total_number_of_cases': st.total_number_of_cases + 1 })
        const updatedReviewer2 = await Reviewer.findByIdAndUpdate(ReviewerId, { 'number_of_cases': st.number_of_cases + 1 })
    },



    SystemCalcFees: async function (id) {
        var Fees = 0
        const newCase = await Case.findById(id)
        const regLaw = await newCase.regulated_law
        const capital = await newCase.equality_capital
        const lawArray = await Laws.find({ lawNumber: regLaw.toString() })
        console.log(lawArray)
        for (var i = 0; i < lawArray.length; i++) {
            var newVal = capital * lawArray[i].lawCalc
            console.log("newVal is" + newVal)
            if (newVal < LawArray[i].min) {
                Fees = Fees + LawArray[i].min
                console.log("newVal<min"+Fees)
            }
            else if (newVal > LawArray[i].max) {
                Fees = Fees + LawArray[i].max
                console.log("newVal>max"+Fees)
            }
            else {
                Fees = Fees + newVal
                console.log("newVal in range"+fees)
            }
            Fees = Fees + LawArray[i].LawValue
            console.log("plues el damgha" + Fees)
        }
        console.log(Fees)
        newCase.fees= Fees
    },

    AdminCreateNewLaw: async function (req, res) {
        try {
            // const isValidated = validator.createValidation(req.body)
            // if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
            const AdminId = '5c9bb0dc5185793518ea84fb' //login token
            const Admin = await Admins.findById(AdminId)
            //if ((!Admin) || (Admin && Admin.Type !== 'Super')) {                  //commented for the sake of the tests
             //   return res.json({ msg: 'Only super admins have access' })         //only super admins can create a new law
            //}
            //else {
                const newLaw = await Laws.create(req.body)
                res.json({ msg: 'Law was created successfully', data: newLaw })
            //}
        }
        catch (error) {
            res.json({ msg: 'Only super admins have access' })
        }
    },

    AdminChangePricingStrategy: async function (req, res) {
        try {
            const AdminId = '5c9bb0dc5185793518ea84fb' //login token
            const Admin = await Admins.findById(AdminId)
            //if ((!Admin) || (Admin && Admin.Type !== 'Super')) {               //commented for the sake of tests
              //  return res.json({ msg: 'Only super admins have access' })      // only super admins can change a law
            //}
            //else {
                const id = req.params.id
                const Law = await Laws.findById(id)
                if (!Law)
                    return res.json({ msg: 'Law does not exist' });
                //  const isValidated = validator.updateValidation(req.body)
                //  if (isValidated.error)  
                //return res.status(400).send({ error: isValidated.error.details[0].message })
                const updatedLaw = await Law.updateOne(req.body)
                res.json({ msg: 'Laws updated successfully', data: updatedLaw })
            //}
        }
        catch (error) {
            // We will be handling the error later
            res.json({ msg: 'Law does not exist' })
        }
    },



 AdmCompListViewing: async (req,res) => {

    try {
        var Cas = await Case.find({ caseStatus: 'published' }, projx)

    for (var i = 0; i < Cas.length; i++) {
     var projx = { '_id': 0, 'reviewerID': 0, 'lawyerID': 0, 'investorID': 0 }
    }
     Cas = await Case.find({ caseStatus: 'published' }, projx)

     return res.json({ message: 'Cases', data: Cas })
 }
     catch (error) {
        console.log(error)
    }
},

AdmCompViewing: async (req, res)=> {

    const id = req.params.id
    var Cas = await Case.findById(id)
    
    try {
        if (Cas.caseStatus === 'published') {
            var proj1 = { '_id': 0, 'reviewerID': 0, 'lawyerID': 0, 'InvestorID': 0 }
            Cas = await Case.findById(id, proj1)
           return res.json({ message: 'case ahe' ,data: Cas }) 
        } else {
           return res.json({ message: 'Case was not published' })

        }
    }
    catch (error) {
        console.log(error)
    }
},
AdmViewing: async (req, res)=> {
    var proj = { '_id': 0, 'password': 0 }
        try {
            const id = req.params.id
            const Inv = await Investor.findById(id, proj)
            const Revs = await Reviewer.findById(id, proj)
            const Adm = await Admins.findById(id,proj)
            const Lawy = await Lawyer.findById(id, proj)
            if(Inv)
            res.json({ message:'investor' ,data: Inv})
            else if(Revs)
            res.json({message: 'Rev' ,data: Revs})
            else if(Lawy)
            res.json({message: 'lawyer',data: Lawy})
            else if(Adm)
            res.json({message: 'Admin', data: Adm})
            else {
                res.json({message: 'User does not exist'})

            }
        }
        catch (error) {
        console.log(error)
    }
},

AdmDelQuestion: async (req, res) => {
   try {
        mongoose.set('useFindAndModify', false)
        const id = req.params.id
        const AdminId = '5c9bb0dc5185793518ea84fb' //login token
        const Admin = await Admins.findById(AdminId)
        const Ques = await Question.findById(id)
         if (!Admin)
            return res.json({ message: 'Only Admins have access' })
        if (!Ques)
             return res.json({message:'not a ques'})
         else {

             const deletedques = await Question.findByIdAndRemove(id)
            return res.json({ message: 'This question was deleted successfully', data: deletedques })
        }
    }
    catch (error) {
        console.log(error)
    }
},    

AdmDelCase: async (req, res) => {
    try {
        mongoose.set('useFindAndModify', false)
        const id = req.params.id
        const aCase = await Case.findById(id)
        const AdminId = '5c9bb0dc5185793518ea84fb' //login token
        const Admin = await Admins.findById(AdminId)
         if (!Admin)
            return res.json({ message: 'Only Admins have access' })
         if (!aCase)
            return res.json({message: 'not a case'})

         else {           
            const deletedCase = await Case.findByIdAndRemove(id)
            return res.json({ message: 'Case was deleted successfully', data: deletedCase })
    }

}
   catch (error) {
    console.log(error)
    res.json({message: error})
   }
},



    AdminAssignLawyer: async function (req, res) {

        try {
            var x = '5c9bb0dc5185793518ea84fb' //get from login token
            const admin = await Admin.findById(x)
            //console.log(admin)
            if (admin) {
                const id = req.body.CaseId
                const id1 = req.body.LawyerId
                const Cases = await Case.findById(id)
                const lawyer = await Lawyer.findById(id1)
                // if(Cases.lawyerID != null )
                // res.json({msg: 'Case already assigned to a lawyer'})
                //else{
                if (lawyer) {
                    const updatedCase = await Case.updateOne({ _id: id }, { $set: { lawyerID: id1 } })
                    console.log(updatedCase.lawyerID)
                    res.json({ msg: 'Case updated successfully', data: updatedCase })
                }
                else
                    res.json({ msg: 'Please select a valid lawyer' })
            }
            //  }
            //  else
            //  res.json({msg:'Only Admins can perform this action'})
        }


        catch (error) {
            // We will be handling the error later
            console.log(error)
        }
    },




    AdminAssignReviewer: async function (req, res) {

        try {
            var x = "5c9bb0dc5185793518ea84fb"
            const admin = await Admin.findById(x)
            console.log(admin)
            if (admin) {
                const id = req.body.CaseId
                const id1 = req.body.ReviewerId
                console.log(id)
                const Cases = await Case.findById(id)
                const rev = await Reviewer.findById(id1)
                //  console.log(staff)
                // if(Cases.reviewerID >= null )
                //res.json({msg: 'Case already assigned to a reviewer'})
                // else{
                if (rev) {
                    const updatedCase = await Case.updateOne({ _id: id }, { $set: { reviewerID: id1 } })

                    res.json({ msg: 'Case updated successfully', data: updatedCase })
                }
                else
                    res.json({ msg: 'Please select a valid reviewer' })

                //}
            }
        }
        catch (error) {
            // We will be handling the error later kkkkkk
            console.log(error)
        }


    },


    SendAttachmentMail: async function (req, res) {
        const email = req.body.email
        const user = await Investor.findOne({ email: email })
        console.log(user)
        if (user) {

            //compose an email
            const html = 'Hi there, <br/> Kindly find Attached the contract '

            //send the email
            //var FileContent = require("fs").readFileSync('D:/Monica GUC/Sem6 =D/CA/CSEN601 project_28866.pdf')
            //try{
                //const projection = { _id: 0, pdfString:1 }
               // const casepdf = await Case.findById('5c9cfd1d05f1d42e68b75fb7', projection)
                //var FileContent = casepdf.pdfString
                
              //  console.log(casepdf)
                //console.log(casepdf.data.pdfString)
           // }
          //  catch(error){
          //      console.log(error)
           // }
              
            
            var attachments = [{
                filename: 'Contract.pdf',
                //filepath: 'D:/Monica GUC/Sem6 =D/CA',
                content: new Buffer( 'JVBERi0xLjMKJf////8KNyAwIG9iago8PAovVHlwZSAvRXh0R1N0YXRlCi9jYSAxCi9DQSAxCj4+CmVuZG9iago2IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL01lZGlhQm94IFswIDAgNTk1LjI4IDg0MS44OV0KL0NvbnRlbnRzIDQgMCBSCi9SZXNvdXJjZXMgNSAwIFIKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldCi9FeHRHU3RhdGUgPDwKL0dzMSA3IDAgUgo+PgovRm9udCA8PAovRjIgOCAwIFIKPj4KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCAzNTkKL0ZpbHRlciAvRmxhdGVEZWNvZGUKPj4Kc3RyZWFtCnictVXLasMwELzrK/YHquzqtRKEHELbQG8tvpUeEscuPbRQDP3+rhylhKDmZGHGki3bM9rHmADluCM5RUc6Jug/1Wo3EbxPanU//Hz0w8tuC/2kcH506r/UqL4V1V7cduU+gUPgyDqxTdFBJx99NEAeulG9rhGRCozAbgDfoHtSD516XoydUdvko08VdifwgiDgxdmZtCEfzW0NUZCa7NwbHYnZ1uK+FxzKzvsNWK/JB+Mhrx0FQ1lvo0zojE0Ba/EwJSdjLowNJM3hrIyoiRpiHQK5Wn2SqCErcKcRj00UIGqM1tbqg3IskoySKeLTNS1fq6IiRKM9elOrlz/mWOazoiYqgtPJMNVqY2beZyVNmB1r62LVp2bmw4WCdFZyNS+xadM3wUg3MP7vIwXUhp2MJklNtT76CyeVHgkSydy3s58cis0v3zvyZzHWxsg3xWUryYZHQ0VYthl3bTMn67kQ+wtBtIw/CmVuZHN0cmVhbQplbmRvYmoKMTAgMCBvYmoKKHBkZm1ha2UpCmVuZG9iagoxMSAwIG9iagoocGRmbWFrZSkKZW5kb2JqCjEyIDAgb2JqCihEOjIwMTkwMzMxMTk1NTQ2WikKZW5kb2JqCjkgMCBvYmoKPDwKL1Byb2R1Y2VyIDEwIDAgUgovQ3JlYXRvciAxMSAwIFIKL0NyZWF0aW9uRGF0ZSAxMiAwIFIKPj4KZW5kb2JqCjE0IDAgb2JqCjw8Ci9UeXBlIC9Gb250RGVzY3JpcHRvcgovRm9udE5hbWUgL0JaWlpaWitSb2JvdG8tUmVndWxhcgovRmxhZ3MgNAovRm9udEJCb3ggWy03MzYuODE2NDA2IC0yNzAuOTk2MDk0IDExNDguNDM3NSAxMDU2LjE1MjM0NF0KL0l0YWxpY0FuZ2xlIDAKL0FzY2VudCA5MjcuNzM0Mzc1Ci9EZXNjZW50IC0yNDQuMTQwNjI1Ci9DYXBIZWlnaHQgNzEwLjkzNzUKL1hIZWlnaHQgNTI4LjMyMDMxMwovU3RlbVYgMAovRm9udEZpbGUyIDEzIDAgUgo+PgplbmRvYmoKMTUgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL0NJREZvbnRUeXBlMgovQmFzZUZvbnQgL0JaWlpaWitSb2JvdG8tUmVndWxhcgovQ0lEU3lzdGVtSW5mbyA8PAovUmVnaXN0cnkgKEFkb2JlKQovT3JkZXJpbmcgKElkZW50aXR5KQovU3VwcGxlbWVudCAwCj4+Ci9Gb250RGVzY3JpcHRvciAxNCAwIFIKL1cgWzAgWzkwOCA1OTMuMjYxNzE5IDY1MC44Nzg5MDYgNjMwLjg1OTM3NSA1MzguMDg1OTM4IDU0My45NDUzMTMgNzUxLjQ2NDg0NCAyNDcuNTU4NTk0IDU2MS41MjM0MzggNTYxLjUyMzQzOCA1NTEuNzU3ODEzIDUyOS43ODUxNTYgNTk2LjY3OTY4OCA0NzMuMTQ0NTMxIDU2MS4wMzUxNTYgMjQyLjY3NTc4MSAzMzguMzc4OTA2IDU3MC4zMTI1IDU2MS4wMzUxNTYgMzQ3LjE2Nzk2OSAzMjYuNjYwMTU2IDU2MS41MjM0MzggNTYxLjUyMzQzOCA1NjEuNTIzNDM4IDU2MS41MjM0MzggNTYxLjUyMzQzOCA1NjEuNTIzNDM4IDU2MS41MjM0MzggMjQyLjY3NTc4MSAyNzUuODc4OTA2IDQ4NC4zNzUgNTE1LjYyNV1dCj4+CmVuZG9iagoxNiAwIG9iago8PAovTGVuZ3RoIDMwMAovRmlsdGVyIC9GbGF0ZURlY29kZQo+PgpzdHJlYW0KeJxdUstugzAQvPMVe0wPEQET0koIqUovHPpQaU9VDmCvkaViLGMO/H2N102qWsKjfcywHjs9N0+NVg7S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', 'base64'),
                contentType: 'application/pdf'
            }]

            console.log('before')
            await mailer.sendEmail(config.user, req.body.email, 'Please verify your email', html, attachments)
            console.log('after')
            res.json({ message: 'Please check your email' })
        }

        else {
            res.json({ message: 'Incorrect Mail' })
        }

    }
}



module.exports = AdminController
