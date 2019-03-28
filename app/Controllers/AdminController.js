const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Admins = require('./../models/Admin');
const validator = require('../../validations/AdminValidations')
"use strict";
const nodemailer = require("nodemailer");
const dotenv = require ("dotenv");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let AdminController = {
//write your methods here: check investorController for example
    
    /* Malak
    this is a method that takes nothing as an input and calculates time
    taken for a case to be finished from a to z
    */

    AdminViewTimeToFinishCase = async function (Data) {
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
    /* Malak
    This is a function that takes as an input a request, a variable (which will
    be the global variable we want to change) and a newValue (the new value
    we will set the global variable with) it check if the user is an admin 
    if yes, change the variable if not error message
    */
   AdminChangePricingStrategy = async function (req, res, variable, newValue){
    const id = req.params.id
    const admin = await admin.findById(id)
    if (!admin){
        res.json({msg: 'you are not authorised to do this action'})
    }
    else{
        if (variable === revenues159){
            revenues159 = newValue
            res.json ({msg: 'Pricing strategy changed succesfully!'})
        }
        if (variable === revenues72){
            revenues72 = newValue
            res.json ({msg: 'Pricing strategy changed succesfully!'})
        }
        if (variable === debt159){
            debt159 = newValue
            res.json ({msg: 'Pricing strategy changed succesfully!'})
        }
        if (variable === debt72){
            debt72 = newValue
            res.json ({msg: 'Pricing strategy changed succesfully!'})
        }
    }
},

/* Malak
this function takes Text, subject< recipient and send an email
*/

SendEmail = async function (Text, Subject, Reciepient){
    
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    // async..await is not allowed in global scope, must use a wrapper
    async function main(){

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


}



module.exports= AdminController;