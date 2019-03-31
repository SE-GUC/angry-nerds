const validator = require('../../validations/caseValidations')
const stripe = require('stripe')('sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0')
const Case = require('./../models/Cases')
const Questions = require('./../models/Questions')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Lawyer = require('./../models/Lawyer')
const Laws= require('./../models/Laws')
const Investor = require('./../models/Investor')
const Admins = require('./../models/Admin')
const Reviewer = require('./../models/Reviewer')



let UserController = {
//write methods here: check InvestorController for example

UnregisteredViewQuestions: async (req,res) =>{
    try {
        const projection = { _id: 0, question: 1, answer: 1, time: 1 }
        const ques = await Questions.find({}, projection)
        res.status(200).json({ data: ques })
    } catch (err) {
        return next(err);
    }
},

viewLawyers: async (req,res) =>{
    try {
       // const projection = { _id: 1, password: 0 }
        const lawyers = await Lawyer.find()
        res.json({ data: lawyers })
    } catch (err) {
        return next(err);
    }
},
UserViewLaws: async function(req, res){
    const Law = await Laws.find()
    res.json({ data: Law })
},

UnregCompViewing: async (req, res)=> {

    const id = req.params.id
    var Cas = await Case.findById(id)    
    try {
        if (Cas.caseStatus === 'published') {
            var proj1 = {
                '_id': 0, 'arabic_name': 1, 'english_name': 1, 'government': 1, 'city': 1
                , 'hq_address': 1, 'hq_city': 1, 'hq_state': 1, 'main_center_phone': 1, 'main_center_fax': 1
            }   
            Cas = await Case.findById(id, proj1)
            res.json({ data: Cas })        
        } else {
            res.json({ message: 'Case was not published' })

        }
    }
    catch (error) {
        console.log(error)
    }
    
        
        
},

UnregCompListViewing: async (req,res) => {

    try {
        var Case = await Cases.find({ caseStatus: 'published' }, projx)

        for (var i = 0; i < Case.length; i++) {
            var projx = {
                '_id': 0, 'arabic_name': 1, 'english_name': 1, 'government': 1, 'city': 1,
                'hq_address': 1, 'hq_city': 1, 'hq_state': 1, 'main_center_phone': 1, 'main_center_fax': 1
            }        }
         Case = await Cases.find({ caseStatus: 'published' }, projx)
         res.json({ data: Case })
     }
     catch (error) {
        console.log(error)
    }
},

UnregViewing: async (req,res) => {
var proj = { '_id': 0, 'firstName': 1, 'MiddleName': 1, 'LastName': 1, 'Nationality': 1, 'Address': 1, 'birthdate': 1, 'telephone_number': 1, 'gender': 1 };

try {
    const id = req.params.id
    const Inv = await Investor.findById(id, proj)
    const Revs = await Reviewer.findById(id, proj)
    const Adm = await Admins.findById(id,proj)
    const Lawy = await Lawyer.findById(id, proj)
    if(Inv)
    res.json({ message:'investor' ,data: Inv})
        else if(Revs)
        res.json({message: 'Rev' ,data: Revs})
        else if(Lawy)
        res.json({message: 'lawyer',data: Lawy})
        else if(Adm)
        res.json({message: 'Admin',data: Adm})
        else {
            res.json({message: 'User does not exist'})

        }
}
catch (error) {
console.log(error)
}


},







    }


module.exports = UserController