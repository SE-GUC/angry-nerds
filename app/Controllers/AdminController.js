const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Admins = require('./../models/Admin')
const Case = require('./../models/Cases')
const validator = require('../../validations/AdminValidations')

let AdminController = {
    //write your methods here: check investorController for example


    /*
    this method allows admins to edit company details,
    This will be used to edit info such as currency, city, name, etc...
    */
    AdminEditCompany: async function (req, res) {

        const AdminID = '5c9bb0dc5185793518ea84fb' //get this from login toked later
        const id = req.params.id //this represents the id of the case being edited
        
            const admin = await Admins.findById(AdminID).catch((err)=>{
                res.json({message:'This id is not valid. please contact technical support'})
            })
            
            const currentCase = await Case.findById(id).catch((err)=>{
                res.json({message:'This id is not valid. please contact technical support'})
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
        else{
            return res.json({
                message: 'the company you are trying to edit does not exist'
            })
        }

        
    },


}

module.exports = AdminController