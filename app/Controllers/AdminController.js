const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Admins = require('./../models/Admin')
const Case = require('./../models/Cases')
const Lawyer = require('./../models/Lawyer')
const Reviewer = require('./../models/Reviewer')
const Investor = require('./../models/Investor')
const Laws = require('./../models/Laws')
const Question = require('./../models/Questions')
const validator = require('../../validations/AdminValidations')
"use strict";
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var InvestorController = require('./InvestorController')

let AdminController = {
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
            res.json({ message: 'This id is not valid a company.' })
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
        var fees = 0
        const newCase = await Case.findById(id)
        const regLaw = await newCase.regulated_law
        const capital = await newCase.equality_capital
        const LawArray = await Laws.find({ LawNumber: regLaw.toString() })
        console.log(LawArray)
        for (var i = 0; i < LawArray.length; i++) {
            var newVal = capital * LawArray[i].LawCalc
            console.log("newVal is" + newVal)
            if (newVal < LawArray[i].min) {
                fees = fees + LawArray[i].min
                console.log("newVal<min" + fees)
            }
            else if (newVal > LawArray[i].max) {
                fees = fees + LawArray[i].max
                console.log("newVal>max" + fees)
            }
            else {
                fees = fees + newVal
                console.log("newVal in range" + fees)
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
            if ((!Admin) || (Admin && Admin.Type !== 'Super')) {
                return res.json({ message: 'Only super admins have access' })
            }
            else {
                const newLaw = await Laws.create(req.body)
                res.json({ message: 'Law was created successfully', data: newLaw })
            }
        }
        catch (error) {
            // We will be handling the error later
            console.log(error)
        }
    },

    AdminChangePricingStrategy: async function (req, res) {
        try {
            const AdminId = '5c9bb0dc5185793518ea84fb' //login token
            const Admin = await Admins.findById(AdminId)
            if ((!Admin) || (Admin && Admin.Type !== 'Super')) {
                return res.json({ message: 'Only super admins have access' })
            }
            else {
                const id = req.params.id
                const Law = await Laws.findById(id)
                if (!Law) return res.status(404).send({ error: 'Law does not exist' });
                //  const isValidated = validator.updateValidation(req.body)
                //  if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
                const updatedLaw = await Law.updateOne(req.body)
                res.json({ message: 'Laws updated successfully', data: updatedLaw })
            }
        }
        catch (error) {
            // We will be handling the error later
            console.log(error)
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

}


module.exports = AdminController
