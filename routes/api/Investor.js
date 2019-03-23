const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const validator = require('../../validations/InvestorValidations')
const Investor = require('../../models/Investor')  

router.get('/', async (req, res)=>{
    const Investors = await Investor.find()
    res.json({data: Investors})
})

router.get('/:id', async (req, res)=>{
   try{
       const id = req.params.id
        const Investors = await Investor.findById(id)
        res.json({data: Investors})
   } 
   catch(error){
    console.log(error)
   }
})

router.post('/', async (req,res) => {
    try {
        const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const newInvestor = await Investor.create(req.body)
     res.json({msg:'Investor was created successfully', data: newInvestor})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 

 router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     console.log(id)
     
     const Invstr = await Investor.findById(id)
     if(!Invstr) return res.status(404).send({error: 'Companies does not exist'})
     const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedInvstr = await Investor.findByIdAndUpdate(id,req.body)
     res.json({msg: 'Investor updated successfully', data: updatedInvstr} )
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedInvestor = await Investor.findByIdAndRemove(id)
     res.json({msg:'Investor was deleted successfully', data: deletedInvestor})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 
router.get('/viewFees/:id', async (req, res)=>{
    try{
        const id = req.params.id
        const Cases = await Case.findById(id)
        const userid = "xhjaxj"; // hard coded for session id 
        if (userid === Cases.body.investorID){
          // calling calc_fees
       }
       else if (userid === Cases.body.lawyerID){
          //calling calc_fees
       } 
       else {
          res.json({msg: 'you are not allowed to view the fees'})
       }
    }
    catch(error){
        res.json({msg: 'failed to access files needed'})
    }
 })

 module.exports = router 
