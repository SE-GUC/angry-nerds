const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const hbs = require('hbs')
const stripe = require('stripe')('sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0')
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

 router.post('/register', async (req,res) => {
    

    console.log(req.body)
    const email = req.body.email
    const user = await Investor.findOne({email})
    if(user) 
        return res.status(400).json({error: 'Email already exists'})
    

    const isValidated = validator.createValidation(req.body)
    if(isValidated.error)
        return res.status(400).send({ error: isValidated.error.details[0].message })

    const newInvestor = await Investor.create(req.body)
    res.json({msg:'Investor was created successfully', data: newInvestor})
    .catch(err => res.json('You could not be registered, try again'))

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

 router.get('/InvViewing/:id', async (req, res)=>{
    const idf = "5c77c2b0c5983856f492f33e"
     const Invs = await Investor.findById(idf)
     const stf = await Staff.findById(idf)
    if ( stf || Invs)
    var proj = {"_id": 0 ,"password": 0}
    else
    var proj = {"_id":0, "firstName": 1,  "MiddleName" : 1,  "LastName":1,  "Nationality": 1 ,"Address": 1 ,"birthdate" :1  ,"telephone_number": 1 ,"gender":1};
    
   try{
       const id = req.params.id
        const Invest = await Investor.findById(id,proj)
        res.json({data: Invest})
   } 
   catch(error){
    console.log(error)
   }
})

 module.exports = router 
