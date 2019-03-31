const validator = require('../../validations/caseValidations')
const stripe = require('stripe')('sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0')
const Case = require('./../models/Cases')
const Reviewer = require('./../models/Reviewer')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


let ReviewerController = {
//write methods here: check InvestorController for example


// the case will go baack to the lawyer to fix his mistake
// will resume timer for lawer's work on case

caseDisAproveedAtReviewer: async function (req, res) {     /// :idStaff/:idCase'  routs
    // var CASE = new Case(req.body);
    // const staff= await Staff.findById(id)

     const caseID = req.params.idCase
     const staffID = req.params.idStaff
     const comment = req.body.Comment

     const reviewer= Reviewer.findById(staffID)
     const CASE =Case.findById(caseID)

     if (reviewer) {  /// test if this if function is valid
         Case.updateOne({_id:req.params.idCase}, {$set: {caseStatus:"lawyer"}}) // updates case with _id matching Case and sets caseStatus to null  
         res.send(Cases)

         var ReviewerEndTime = new Date();                  
         var ReviewerStartTime = CASE.body.reviewerStartTime             
         var ReviewerHours =Math.abs(ReviewerEndTime-ReviewerStartTime)/36e5           
         var ReviewerTotalTimeATCase =CASE.body.reviewerTotalTime + ReviewerHours
         var RevieweTotalTime = reviewer.body.total_time_on_cases + ReviewerTotalTimeATCase

         var LawyerStartTime = new Date()

         Case.findByIdAndUpdate(id, { 'lawyerStartTime': LawyerStartTime,})     
         Case.findByIdAndUpdate(id, { 'reviewerTotalTime': ReviewerTotalTimeATCase,})     
         Reviewer.findByIdAndUpdate(staffID, { 'total_number_of_cases':RevieweTotalTime})       
  
         
         ReviewerController.reviewrWriteComment(casID,comment)
                       



     };
   }   ,

   caseAproveedAtreviewer: async function (req, res) {
    // var CASE = new Case(req.body);
    // const staff= await Staff.findById(id)

    const staffID = req.params.idStaff
    const caseID = req.params.idCase


    const reviewer= Reviewer.findById(staffID)
    const CASE =Case.findById(caseID)

     const reviewer= Reviewer.findById(idStaff)
     if (reviewer) {  /// test if this if function is valid
         Case.updateOne({_id:req.params.idCase}, {$set: {caseStatus:"pending"}}) // updates case with _id matching Case and sets caseStatus to null  
         res.send(Cases)

         var ReviewerEndTime = new Date();                  
         var ReviewerStartTime = CASE.body.reviewerStartTime             
         var ReviewerHours =Math.abs(ReviewerEndTime-ReviewerStartTime)/36e5           
         var ReviewerTotalTimeATCase =CASE.body.reviewerTotalTime + ReviewerHours
         var RevieweTotalTime = reviewer.body.total_time_on_cases + ReviewerTotalTimeATCase

         Case.findByIdAndUpdate(id, { 'reviewerTotalTime': ReviewerTotalTimeATCase})  
         Reviewer.findByIdAndUpdate(staffID, { 'total_number_of_cases':RevieweTotalTime})       
   



     };
   }   ,

   reviewrWriteComment: async function (caseID,comment) {  //   Only  called in case(Dis)AproveedAtReviewer!! and takes caseID and comment as inputs
    const CASE = Case.findById(caseID)
    // const comment = req.params.comment
    // const comment = req.params.Comment


    const writecomment = await Case.findByIdAndUpdate(id, { 'comment.text': comment,})
    return res.status(200).json({ msg: 'comment sent', data: writecomment })

   }   ,

   viewCasesReviewer: async function (req, res) {         // req contain the lawyer id 
    try {
        const id = req.params.id
        let reviewer = await Lawyer.findById(id)
        if (!reviewer) {
            return res.status(404).json({ error: 'error' })
        }
        else {
            let cases = await Case.find({'reviewerID': id })
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
        PUT request to change password of the reviewer
        PARAMS:{ adminID: String }
        BODY:{   oldPassword: String,
                 newPassword: String }
        * Checks if the admin is in the database,
        then checks if the oldPassword matches the one in the database.
        Then changes the password in the database.     
        RETURNS 404 NOT FOUND: if the ID is not in the database.
                403 FORBIDDEN: if the old password does not match the password in the database.
                200 OK: if the password is updated.
        */
       reviewerChangePassword: async function(req,res) {
        const id = req.params.id
        const oldPassword = req.body.oldPassword
        const newPassword = req.body.newPassword
        let reviewer = await Reviewer.findById(id)
        if(!reviewer){
            return res.status(404).json({error: 'Cannot find an admin account with this ID'})
        }
        else{
            if(oldPassword != reviewer.password){
                return res.status(403).json({error: 'The passwords do not match'})
            }
            else{
                const updatedReviewer = await Reviewer.findByIdAndUpdate(id, {
                    'password': newPassword,
                })
                reviewer = await Reviewer.findById(id)
                return res.status(200).json({ msg: 'The password was updated' , data: reviewer})
            }
        }

    },

    /*
        GET request to view the notifications of the reviewer.
        PARAMS:{ adminID: String }
        * Checks if the reviewer is in the database,
        then checks gets thier notifications.   
        RETURNS 404 NOT FOUND: if the ID is not in the database.
                200 OK: if it pereforms the query.
                400 BAD REQUEST: if an exception is thrown.   
    */
   reviewerMyNotifications: async function(req,res) {
    try{
    const id = req.params.id
    let reviewer = await reviewer.findById(id)
    if(!reviewer){
        return res.status(404).json({error: 'Cannot find an reviewer account with this ID'})
    }
    else{
        let notifications = await Notification.find({'receiverReviewer':id})
        return res.status(200).json({ data: notifications})
    }
    
    }
    catch(error){
        console.log(error)
        return res.status(400).json({ error:'Error processing query.'})
    }

}


   //    reviewerComment: async function (req, res) {    
       
    
   

//    }   ,


}

module.exports = ReviewerController