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

    lawyerViewLawyersLeaderBoard: async(req,res)=>{
        try{
            const lawyerid = '5c9e48bb3f08ad4ea807ea10'
            const lawyer = await Lawyer.findById(lawyerid)
            if (!lawyer)
                return res.status(404).send({ error: 'You are not allowed to view the Leaderboard' });
            const leaderboard= await Lawyer.find().sort({completed_number_of_cases: 1});
            console.log(Lawyer)
            console.log(leaderboard)
            return res.json({ data: leaderboard});



        }
        catch(error){
            console.log(error)
            return res.status(404).send({ error: 'LeaderBoard cant be viewed' })

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
                    const updatedLawyer = await Lawyer.findByIdAndUpdate(id, {
                        'password': newPassword,
                    })
                    lawyer = await Lawyer.findById(id)
                    return res.status(200).json({ msg: 'The password was updated', data: lawyer })
                }
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: 'Error processing query.' })
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
