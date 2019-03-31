const validator = require('../../validations/caseValidations')
const stripe = require('stripe')('sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0')
const Case = require('./../models/Cases')
const Lawyer = require('./../models/Lawyer')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

let LawyerController = {
    //write methods here: check InvestorController for example
    lawyerFillForm: async (req, res) => {

        try {
            const id = '5c77e91b3fd76231ecbf04ee'
            const lawyer = await Lawyer.findById(id)

            if (!lawyer)
                return res.status(404).send({ error: 'You are not allowed to fill this form' });

            const newForm = await Case.create(req.body)
            const casecreated = await Case.findByIdAndUpdate(newForm.id, {
                'caseStatus': 'lawyer-investor',
                'caseOpenSince': new Date(),
                'lawyerStartDate': new Date(),
                'lawyerID': lawyer
            })
            res.json({ msg: 'The form was created successfully' })

        }
        catch (error) {

            console.log(error)
            return res.status(404).send({ error: 'Form cant be created' })
        }

    },


    lawyerUpdateForm: async (id) => {
        try {
            const lawyerid = '5c77e91b3fd76231ecbf04ee'
            const lawyer = await Investor.findById(lawyerid)
            const form = await Case.findById(id)
            if (!lawyer)
                return res.status(404).send({ error: 'You are not allowed to update this form' });
            if (!form)
                return res.status(404).send({ error: 'The form you are trying to update does not exist' });
            var updatedForm = await Case.findByIdAndUpdate(id, req.body)
            res.json({ msg: 'Form updated successfully', data: updatedForm })

        }
        catch (error) {
            return res.status(404).send({ error: 'Form cant be updated' })


        }
    },

    lawyerViewComment: async (req, res) => {
        try {
            const formid = '5c9cfd1d05f1d42e68b75fb7'
            const lawyerid = '5c77e91b3fd76231ecbf04ee'
            const lawyer = await Lawyer.findById(lawyerid)
            const form = await Case.findById(formid)
            if (!form)
                return res.status(404).send({ error: 'The form does not exist' });
            if (!lawyer)
                return res.status(404).send({ error: 'You are not allowed to view this comment, You are not a lawyer' });
            if (form.lawyerID.toString() === lawyerid.toString()) {
                return res.json({ data: form.comment });
            }
            else {
                return res.status(404).send({ error: 'You are not allowed to view this comment, You are not the investor of this company' });
            }
        }
        catch (error) {
            console.log(error)
            return res.status(404).send({ error: 'Comment cant be viewed' })

        }


    },

    /*
    PUT request to change password of the lawyer
    PARAMS:{ lawyerID: String }
    BODY:{   oldPassword: String,
            newPassword: String }
    * Checks if the lawyer is in the database,
    then checks if the oldPassword matches the one in the database.
    Then changes the password in the database.     
    RETURNS 404 NOT FOUND: if the ID is not in the database.
            403 FORBIDDEN: if the old password does not match the password in the database.
            200 OK: if the password is updated.
            400 BAD REQUEST: if an exception is thrown.   

    */

    lawyerChangePassword: async function (req, res) {
        try {
            const id = req.params.id
            const oldPassword = req.body.oldPassword
            const newPassword = req.body.newPassword
            let lawyer = await Lawyer.findById(id)
            if (!lawyer) {
                return res.status(404).json({ error: 'Cannot find an admin account with this ID' })
            }
            else {
                if (oldPassword != lawyer.password) {
                    return res.status(403).json({ error: 'The passwords do not match' })
                }
                else {
                    const updatedLawyer = await Lawyer.findByIdAndUpdate(id, {      ////////////
                        'password': newPassword,
                    })
                    lawyer = await Lawyer.findById(id)
                    return res.status(200).json({ msg: 'The password was updated', data: lawyer })
                }
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: 'Error processing query.' })
        } },


caseDisAproveedAtLawyer: async function (req, res) {       /// :idStaff/:idCase'  routs
   // var CASE = new Case(req.body);
   // const staff= await Staff.findById(id)

   const caseID = req.params.idCase
   const staffID = req.params.idStaff

   const CASE =Case.findById(caseID)
   const lawyer= Lawyer.findById(staffID)
   


    if (lawyer) {       
        Case.updateOne({_id:req.params.idCase}, {$set: {caseStatus:"Investor"}}) // updates case with _id matching Case and sets caseStatus to null  

        var LawyerEndTime = new Date();  
        var lawyerStartTime = Case.body.lawyerStartTime              
        var lawyerHours =Math.abs(LawyerEndTime-lawyerStartTime)/36e5            
        var lawyerTotalTimeAtCase =CASE.body.lawyerTotalTime + lawyerHours             // this is the total time on this specific case
        var lawyerTotalTime = lawyer.body.total_time_on_cases + lawyerTotalTimeAtCase  // this is the overall total time on all cases


        Case.findByIdAndUpdate(caseID, { 'lawyerTotalTime': lawyerTotalTime,})    
        Lawyer.findByIdAndUpdate(staffID, { 'total_time_on_cases': lawyerTotalTime,})   

        return res.status(200).json({ msg: 'cases updated', data: lawyer })
       
    }
    else {
        return res.status(404).json({ error: 'error ' })


    }
  }   ,

  caseAproveedAtLawyer: async function (req, res) {     /// :idStaff/:idCase'  routs

    const caseID = req.params.idCase
    const staffID = req.params.idStaff

     const lawyer= Lawyer.findById(idStaff)
     const CASE =Case.findById(caseID)

     const comment = req.body.Comment

     if (lawyer) {  /// test if this if function is valid
         Case.updateOne({_id:req.params.idCase}, {$set: {caseStatus:"reviewer"}}) // updates case with _id matching Case and sets caseStatus to null  
         res.send(Cases)
                                                   
    var LawyerEndTime = new Date();                  //// start time for reviewer
    var lawyerStartTime = CASE.body.lawyerStartTime               /// get total time of lawyer
    var lawyerHours =Math.abs(LawyerEndTime-lawyerStartTime)/36e5            // total time lawyer worked on this casn "in  this session"
    var lawyerTotalTimeAtCase =CASE.body.lawyerTotalTime + lawyerHours
    var ReviewerStartDate = new Date();
    var lawyerTotalTime = lawyer.body.total_time_on_cases + lawyerTotalTimeAtCase

    Case.findByIdAndUpdate(caseID, { 'reviewerStartTime': ReviewerStartDate,})     // ID of CASE
    Case.findByIdAndUpdate(caseID, { 'lawyerTotalTime': lawyerTotalTimeAtCase,})       // ID of Lawyer
    Lawyer.findByIdAndUpdate(staffID, { 'total_time_on_cases': lawyerTotalTime,})  

    LawyerController.lawyerWriteComment(caseID,comment)

                      
     }

     else {
        return res.status(404).json({ error: 'error ' })
    }
   }   ,

  

   lawyerWriteComment: async function (caseID,comment) {  //   Only  called in caseDisAproveedAtLawyer !! and takes caseID and comment as inputs
    const CASE = Case.findById(caseID)
    // const comment = req.params.comment

    const writecomment = await Case.findByIdAndUpdate(caseID, { 'password': comment,})
    return res.status(200).json({ msg: 'comment sent', data: writecomment })

   }   ,

   viewCasesLawyer: async function (req, res) {         // req contain the lawyer id 
    try {
        const id = req.params.id
        let lawyer = await Lawyer.findById(id)
        if (!lawyer) {
            return res.status(404).json({ error: 'Cannot find an investor account with this ID' })
        }
        else {
            let cases = await Case.find({'lawyerID': id })
                if(!cases){
                    return res.status(404).json({ error: 'Cannot find cases' })

            }
            return res.status(200).json({ data: cases })
        }

    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ error: 'Error processing query.' })
    }

   }   ,

    /*
        GET request to view the notifications of the lawyer.
        PARAMS:{ adminID: String }
        * Checks if the lawyer is in the database,
        then checks gets thier notifications.   
        RETURNS 404 NOT FOUND: if the ID is not in the database.
                200 OK: if it pereforms the query.
                400 BAD REQUEST: if an exception is thrown.   
    */
    lawyerMyNotifications: async function (req, res) {
        try {
            const id = req.params.id
            let lawyer = await lawyer.findById(id)
            if (!lawyer) {
                return res.status(404).json({ error: 'Cannot find an lawyer account with this ID' })
            }
            else {
                let notifications = await Notification.find({ 'receiverLawyer': id })
                return res.status(200).json({ data: notifications })
            }

        }
        catch (error) {
            console.log(error)
            return res.status(400).json({ error: 'Error processing query.' })
        }

    }

}

module.exports = LawyerController
