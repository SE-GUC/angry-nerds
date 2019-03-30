const validator = require('../../validations/caseValidations')
const stripe = require('stripe')('sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0')
const Case = require('./../models/Cases')
const Reviewer = require('./../models/Reviewer')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Lawyer = require('./../models/Lawyer')



let ReviewerController = {
//write methods here: check InvestorController for example

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
    let reviewer = await Reviewer.findById(id)
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

},
reviewerViewLawyersLeaderBoard: async(req,res)=>{
    try{
        const reviewerid = '5c9e48bb3f08ad4ea807ea10'
        const reviewer = await Reviewer.findById(reviewerid)
        if (!reviewer)
            return res.status(404).send({ error: 'You are not allowed to view the Leaderboard' });
        const leaderboard= await Lawyer.find().sort({completed_number_of_cases: 1});
       // console.log(Lawyer)
        //console.log(leaderboard)
        return res.json({ data: leaderboard});



    }
    catch(error){
        //console.log(error)
        return res.status(404).send({ error: 'LeaderBoard cant be viewed' })

    }
}





}

module.exports = ReviewerController