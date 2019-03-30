const validator = require('../../validations/caseValidations')
const stripe = require('stripe')('sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0')
const Case = require('./../models/Cases')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Lawyer = require('../models/Lawyer')




let LawyerController = {
//write methods here: check InvestorController for example
calc_fees : async function (req,res) {
    const CaseId = req.params.CaseId
    const LawyerId = req.params.LawyerId
    const fees = req.params.fees
    const Cases = await Case.findById(CaseId)
    if (Cases.caseStatus==='Lawyer' && Cases.lawyerID === LawyerId){
        const updateCase = await Case.findByIdAndUpdate(CaseId, { 'fees': fees })
    }

}







}

module.exports = LawyerController