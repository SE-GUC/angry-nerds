const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Forms = require('../../models/Forms')
const validator = require('../../validations/formsValidations')


// get all form
router.get('/', async (req,res) => {
    const forms = await Forms.find()
    res.json({data: forms})
})

// get a form
/*router.get('/:id', async (req,res) => {
    const id = req.params.id
     const forms = await Forms.findById(id)
    res.json({data: forms})
})*/

// Create a form
router.post('/', async (req,res) => {
   try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newForm = await Forms.create(req.body)
    res.json({msg:'Form was created successfully', data: newForm})
   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }  
})

// Update a form
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const Form = await Forms.findById(id)
     if(!Form) return res.status(404).send({error: 'Companies does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedCompany = await Forms.findByIdAndUpdate(id,req.body)
     res.json({msg: 'Companies updated successfully', data: updatedCompany} )
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })




// delete a form
 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedForm = await Forms.findByIdAndRemove(id)
     res.json({msg:'Form was deleted successfully', data: deletedForm})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 router.get('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const form = await Forms.findById(id)
     res.json({msg:'get is working', data: form})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })
 
 

module.exports = router