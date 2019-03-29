const validator = require('../../validations/caseValidations')
const stripe = require('stripe')('sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0')
const Case = require('./../models/Cases')
const Lawyer = require('./../models/Lawyer')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

let LawyerController = {
//write methods here: check InvestorController for example
lawyerFillForm:async(req,res)=>{

    try{ 
        const id = '5c77e91b3fd76231ecbf04ee'
        const lawyer = await Lawyer.findById(id)
        
        if (!lawyer)
             return res.status(404).send({ error: 'You are not allowed to fill this form' });
    
        const newForm = await Case.create(req.body)
        const casecreated = await Case.findByIdAndUpdate(newForm.id, {  'caseStatus': 'lawyer-investor',
                                                                        'caseOpenSince': new Date(),
                                                                        'lawyerStartDate':new Date(),
                                                                        'lawyerID':lawyer })
        res.json({ msg: 'The form was created successfully' })

    }
    catch (error) {

        console.log(error)
        return res.status(404).send({ error: 'Form cant be created' })
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

    lawyerChangePassword: async function(req,res) {
        try{
        const id = req.params.id
        const oldPassword = req.body.oldPassword
        const newPassword = req.body.newPassword
        let lawyer = await Lawyer.findById(id)
        if(!lawyer){
            return res.status(404).json({error: 'Cannot find an admin account with this ID'})
        }
        else{
            if(oldPassword != lawyer.password){
                return res.status(403).json({error: 'The passwords do not match'})
            }
            else{
                const updatedLawyer = await Lawyer.findByIdAndUpdate(id, {
                    'password': newPassword,
                })
                lawyer = await Lawyer.findById(id)
                return res.status(200).json({ msg: 'The password was updated' , data: lawyer})
            }
        }
    }catch(error){
        console.log(error)
        return res.status(400).json({ error:'Error processing query.'})
    }

    },

    /*
        GET request to view the notifications of the lawyer.
        PARAMS:{ adminID: String }
        * Checks if the lawyer is in the database,
        then checks gets thier notifications.   
        RETURNS 404 NOT FOUND: if the ID is not in the database.
                200 OK: if it pereforms the query.
                400 BAD REQUEST: if an exception is thrown.   
    */
   lawyerMyNotifications: async function(req,res) {
    try{
    const id = req.params.id
    let lawyer = await lawyer.findById(id)
    if(!lawyer){
        return res.status(404).json({error: 'Cannot find an lawyer account with this ID'})
    }
    else{
        let notifications = await Notification.find({'receiverLawyer':id})
        return res.status(200).json({ data: notifications})
    }
    
    }
    catch(error){
        console.log(error)
        return res.status(400).json({ error:'Error processing query.'})
    }

}




}

module.exports = LawyerController
