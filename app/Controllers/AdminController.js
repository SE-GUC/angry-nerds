const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Admins = require('./../models/Admin')
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



var InvestorController = require('./InvestorController')

let AdminController = {
//write your methods here: check investorController for example
<<<<<<< HEAD

AdminDeleteInvestor:async (req,res) =>{
    try{
        mongoose.set('useFindAndModify', false)
        const id = req.params.id
        const AdminId = '5c9bb0dc5185793518ea84fb' //login token

        const Admin = await Admins.findById(AdminId)
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

        if(!Admin)
            return res.json({msg: 'Only Admins have access'})
        else{
            await InvestorController.deleteInvestor(id)
            return res.json({msg: 'Investor deleted successfully'})
        }
        
    }
    catch(error){
        res.json({ msg: 'Can not perform this action' })
    }
},

AdminRegisterLawyer: async (req,res) =>{
    const AdminId = '5c9bb0dc5185793518ea84fb' //login token
    const Admin = await Admins.findById(AdminId)
    if(!Admin)
        return res.json({msg: 'Only Admins have access'}) 
    const email = req.body.email
    const Lawyers = await Lawyer.findOne({ email })
    if (user)
        return res.status(400).json({ error: 'Email already exists' })
    else{
        const newLawyer = await Lawyer.create(req.body)
        res.json({ msg: 'Lawyer was created successfully', data: newLawyer })
        .catch(err => res.json('There was an error ,Try again later'))
    }
    
},
AdminRegisterReviewer: async (req,res) =>{
    const AdminId = '5c9bb0dc5185793518ea84fb' //login token
    const Admin = await Admins.findById(AdminId)
    if(!Admin)
        return res.json({msg: 'Only Admins have access'}) 
    const email = req.body.email
    const Reviewers = await Reviewer.findOne({ email })
    if (user)
        return res.status(400).json({ error: 'Email already exists' })
    else{
        const newReviewer = await Reviewer.create(req.body)
        res.json({ msg: 'Reviewer was created successfully', data: newReviewer })
        .catch(err => res.json('There was an error ,Try again later'))
    }
    
},

}

<<<<<<< HEAD
}
=======
>>>>>>> master
module.exports = AdminController