const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Admins = require('./../models/Admin')
const Case = require('./../models/Cases')
const Lawyer = require('./../models/Lawyer')
const Reviewer = require('./../models/Reviewer')
const Laws = require('./../models/Laws')
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

    AdminRegisterLawyer: async (req, res) => {
        const AdminId = '5c9bb0dc5185793518ea84fb' //login token
        const Admin = await Admins.findById(AdminId)
        if (!Admin)
            return res.json({ msg: 'Only Admins have access' })
        const email = req.body.email
        const Lawyers = await Lawyer.findOne({ email })
        if (user)
            return res.status(400).json({ error: 'Email already exists' })
        else {
            const newLawyer = await Lawyer.create(req.body)
            res.json({ msg: 'Lawyer was created successfully', data: newLawyer })
                .catch(err => res.json('There was an error ,Try again later'))
        }

    },
    AdminRegisterReviewer: async (req, res) => {
        const AdminId = '5c9bb0dc5185793518ea84fb' //login token
        const Admin = await Admins.findById(AdminId)
        if (!Admin)
            return res.json({ msg: 'Only Admins have access' })
        const email = req.body.email
        const Reviewers = await Reviewer.findOne({ email })
        if (user)
            return res.status(400).json({ error: 'Email already exists' })
        else {
            const newReviewer = await Reviewer.create(req.body)
            res.json({ msg: 'Reviewer was created successfully', data: newReviewer })
                .catch(err => res.json('There was an error ,Try again later'))
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

    SystemCalcFees: async function (id) {
        var fees = 0
        const newCase = await Case.findById(id)
        const regLaw = await newCase.regulated_law
        const capital = await newCase.equality_capital
        const LawArray = await Laws.find({LawNumber: regLaw.toString()})
        console.log(LawArray)
        for (var i = 0; i < LawArray.length; i++) {
            var newVal = capital * LawArray[i].LawCalc
            console.log("newVal is" +newVal)
            if (newVal < LawArray[i].min) {
                fees = fees + LawArray[i].min
                console.log("newVal<min"+fees)
            }
            else if (newVal > LawArray[i].max) {
                fees = fees + LawArray[i].max
                console.log("newVal>max"+fees)
            }
            else {
                fees = fees + newVal
                console.log("newVal in range"+fees)
            }
            fees = fees + LawArray[i].LawValue
            console.log("plues el damgha" + fees)
        }
        console.log(fees)
    },

    AdminCreateNewLaw: async function (req, res) {
        try {
            // const isValidated = validator.createValidation(req.body)
            // if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
            const AdminId = '5c9bb0dc5185793518ea84fb' //login token
            const Admin = await Admins.findById(AdminId)
            if ((!Admin)|| (Admin && Admin.Type !== 'Super')) {
                return res.json({ msg: 'Only super admins have access' })
            }
            else {
                const newLaw = await Laws.create(req.body)
                res.json({ msg: 'Law was created successfully', data: newLaw })
            }
        }
        catch (error) {
            // We will be handling the error later
            console.log(error)
        }
    },

    

    AdminChangePricingStrategy: async function(req, res) {
        try {
            const AdminId = '5c9bb0dc5185793518ea84fb' //login token
            const Admin = await Admins.findById(AdminId)
            if ((!Admin) || (Admin && Admin.Type !== 'Super')) {
                return res.json({ msg: 'Only super admins have access' })
            }
            else {
            const id = req.params.id
            const Law = await Laws.findById(id)
            if (!Law) return res.status(404).send({ error: 'Law does not exist' });
            //  const isValidated = validator.updateValidation(req.body)
            //  if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
            const updatedLaw = await Law.updateOne(req.body)
            res.json({ msg: 'Laws updated successfully', data: updatedLaw })
            }
        }
        catch (error) {
            // We will be handling the error later
            console.log(error)
        }
    }
}


module.exports = AdminController
