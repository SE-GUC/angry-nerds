const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Admins = require('./../models/Admin')
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




}
module.exports = AdminController