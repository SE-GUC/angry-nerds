const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Admins = require('./../models/Admin')
const validator = require('../../validations/AdminValidations')
var InvestorController = require('./InvestorController')

let AdminController = {
//write your methods here: check investorController for example

AdminDeleteInvestor:async (id) =>{
   // const id = req.params.id
    const AdminId = '5c77c2b0c5973856f492f33e' //login token

    const Admin = await Admins.findById(AdminId)

    if(!Admin)
        return res.json({msg: 'Only Admins have access'})
    InvestorController.deleteInvestor(id) 
    
},




}