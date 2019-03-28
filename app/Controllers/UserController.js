const validator = require('../../validations/caseValidations')
const stripe = require('stripe')('sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0')
const Case = require('./../models/Cases')
const Questions = require('./../models/Questions')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')




let UserController = {
//write methods here: check InvestorController for example

UnregisteredViewQuestions: async (req,res) =>{
    try {
        const projection = { _id: 0, question: 1, answer: 1, time: 1 }
        const ques = await Questions.find({}, projection)
        res.json({ data: ques })
    } catch (err) {
        return next(err);
    }
}







}

module.exports = UserController