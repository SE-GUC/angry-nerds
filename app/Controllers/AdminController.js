const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Admins = require('./../models/Admin')
const Case = require('./../models/Cases')
const Lawyer = require('./../models/Lawyer')
const Reviewer = require('./../models/Reviewer')
const validator = require('../../validations/AdminValidations')
"use strict";
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var InvestorController = require('./InvestorController')

let AdminController = {
    //write your methods here: check investorController for example
    //write your methods here: check investorController for example


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

            const Admin = await Admins.findById(AdminId)

            if (!Admin)
                return res.json({ msg: 'Only Admins have access' })
            else {
                await InvestorController.deleteInvestor(id)
                return res.json({ msg: 'Investor deleted successfully' })
            }

        }
        catch (error) {
            res.json({ msg: 'Can not perform this action' })
        }
    },
    AdminRegisterReviewer: async (req, res) => {
        const AdminId = '5c9bb0dc5185793518ea84fb' //login token
        const Admin = await Admins.findById(AdminId)
        if (!Admin)
            return res.json({ msg: 'Only Admins have access' })
        const email = req.body.email
        const Reviewers = await Reviewer.findOne({ email })
        if (Reviewers)
            return res.status(400).json({ error: 'Email already exists' })
        else {
            const newReviewer = await Reviewer.create(req.body)
            res.json({ msg: 'Reviewer was created successfully', data: newReviewer })
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
            return res.json({ msg: 'Only Admins have access' })
        const email = req.body.email
        const Lawyers = await Lawyer.findOne({ email })
        if (Lawyers)
            return res.status(400).json({ error: 'Email already exists' })
        else {
            const newLawyer = await Lawyer.create(req.body)
            res.json({ msg: 'Lawyer was created successfully', data: newLawyer })
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
        if ((!Admin) || (Admin && Admin.Type !== 'Super'))
            return res.json({ msg: 'Only super admins have access' })
        const email = req.body.email
        const checkAdmin = await Admins.findOne({ email })
        if (checkAdmin)
            return res.status(400).json({ error: 'Email already exists' })
        else {
            if (req.body.Type !== 'Admin')
                return res.json({ msg: 'Type should be only Admin' })
            const newAdmin = await Admins.create(req.body)
            res.json({ msg: 'Admin was created successfully', data: newAdmin })
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
                return res.json({ msg: 'Only super admin has access' })
            else {
                await Admins.findByIdAndRemove(id)
                return res.json({ msg: 'Admin deleted successfully' })
            }

        }
        catch (error) {
            res.json({ msg: 'Can not perform this action' })
        }
    },
    

    adminViewComment:async(req,res)=>{
    try{
        const formid='5c9cfd1d05f1d42e68b75fb7'
        const adminid = '5c77e91b3fd76231ecbf04ee'
        const admin = await Admins.findById(adminid)
        const form = await Case.findById(formid)
        if (!form)
          return res.status(404).send({ error: 'The form does not exist' });
        if (!admin)
          return res.status(404).send({ error: 'You are not allowed to view this comment'});
        return res.json({ data: form.comment });
    }
    catch(error){
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
   adminChangePassword: async function(req,res) {
    try{
    const id = req.params.id
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    let admin = await Admins.findById(id)
    if(!admin){
        return res.status(404).json({error: 'Cannot find an admin account with this ID'})
    }
    else{
        if(oldPassword != admin.password){
            return res.status(403).json({error: 'The passwords do not match'})
        }
        else{
            const updatedAdmin = await Admins.findByIdAndUpdate(id, {
                'password': newPassword,
            })
            admin = await Admin.findById(id)
            return res.status(200).json({ msg: 'The password was updated' , data: admin})
        }
    }
    }
    catch(error){
        console.log(error)
        return res.status(400).json({ error:'Error processing query.'})
    }   
    }

}

module.exports = AdminController
