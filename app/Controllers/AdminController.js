const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Admins = require('./../models/Admin')
const Lawyer = require('./../models/Lawyer')
const Reviewer = require('./../models/Reviewer')
const validator = require('../../validations/AdminValidations')

var InvestorController = require('./InvestorController')

let AdminController = {
//write your methods here: check investorController for example

AdminDeleteInvestor:async (req,res) =>{
    try{
        mongoose.set('useFindAndModify', false)
        const id = req.params.id
        const AdminId = '5c9bb0dc5185793518ea84fb' //login token

        const Admin = await Admins.findById(AdminId)

        if(!Admin)
            return res.json({msg: 'Only Admins have access'})
        else{
            await InvestorController.deleteInvestor(id)
            return res.json({msg: 'Investor deleted successfully'})
        }
        
    }
    catch(error){
        res.json({ msg: 'Can not perform this action' })
    }
},

AdminRegisterLawyer: async (req,res) =>{
    const email = req.body.email
    const Lawyers = await Lawyer.findOne({ email })
    if (user)
        return res.status(400).json({ error: 'Email already exists' })
    else{
        const newLawyer = await Lawyer.create(req.body)
        res.json({ msg: 'Lawyer was created successfully', data: newLawyer })
        .catch(err => res.json('There was an error ,Try again later'))
    }
    
},
AdminRegisterReviewer: async (req,res) =>{
    const email = req.body.email
    const Reviewers = await Reviewer.findOne({ email })
    if (user)
        return res.status(400).json({ error: 'Email already exists' })
    else{
        const newReviewer = await Reviewer.create(req.body)
        res.json({ msg: 'Reviewer was created successfully', data: newReviewer })
        .catch(err => res.json('There was an error ,Try again later'))
    }
    
},


}
module.exports = AdminController