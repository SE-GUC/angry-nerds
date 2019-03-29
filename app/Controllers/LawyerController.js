const validator = require('../../validations/caseValidations')
const stripe = require('stripe')('sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0')
const Case = require('./../models/Cases')
const Lawyer = require('./../models/Lawyer')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')




let LawyerController = {
//write methods here: check InvestorController for example


caseDisAproveedAtLawyer: async function (req, res) {
   // var CASE = new Case(req.body);
   // const staff= await Staff.findById(id)
    const lawyer= Lawyer.findById(idStaff)
    if (lawyer) {  /// test if this if function is valid
        Case.updateOne({_id:req.params.idCase}, {$set: {caseStatus:"null"}}) // updates case with _id matching Case and sets caseStatus to null  
        res.send(Cases)
    };
  }   ,

  caseAproveedAtLawyer: async function (req, res) {
    // var CASE = new Case(req.body);
    // const staff= await Staff.findById(id)
     const lawyer= Lawyer.findById(idStaff)
     if (lawyer) {  /// test if this if function is valid
         Case.updateOne({_id:req.params.idCase}, {$set: {caseStatus:"reviewer"}}) // updates case with _id matching Case and sets caseStatus to null  
         res.send(Cases)
     };
   }   ,

   viewCasesLawyer: async function (req, res) {         // req contain the lawyer id 
    var data = JSON.parse(req.body).data

    var text = '{ \'data\': ['
    console.log(data.length)
    for (let i = 0; i < data.length - 1; i++) {
        if (data[i].caseStatus === 'lawyer' && data[i].lawyerID === id) {
            text += (JSON.stringify(data[i]) + ',')
        }
    }
    if (data.length > 0) {
        if (data[data.length - 1].caseStatus === 'lawyer' && data[data.length - 1].lawyerID === id) {
            text += (JSON.stringify(data[data.length - 1]))
        }
    }
    text += '] }'
    var obj = JSON.parse(text);
    console.log(obj)

    return obj;

   }   ,

//    lawyerComment: async function (req, res) {
       
//     var commentArray = []
//     var data = JSON.parse(req.body).data

//     commentArray = data.comment
//     console.log(commentArray)
//     commentArray.push(JSON.parse(text))
//     // console.log(JSON.stringify('{'+commentArray+'}'))

//     var com = { comment: commentArray }  
//     // com.put('comment',commentArray.toString)


//    }   ,

   

   








}

module.exports = LawyerController