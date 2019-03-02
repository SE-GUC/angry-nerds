const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Company = require('../../models/Companies')
//const validator = require('../../validations/CompaniesValidations')

router.get('/', async (req,res) => {
    const Companies = await Company.find()
    res.json({data: Companies})
})

// router.get('/:id', async (req,res) => {
//     try{
//         const id = req.params.id
//         const Companies = await Company.findById({id})
//         res.json({data: Companies})
//     }
//     catch(error){
//         console.log(error)
//     }
// })

router.get('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const Companies = await Company.findById(id)
     res.json({ data: Companies})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

// Create a Companies
router.post('/', async (req,res) => {
   try {
    //const isValidated = validator.createValidation(req.body)
    //if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newCompany = await Company.create(req.body)
    res.json({msg:'Companies was created successfully', data: newCompany})
   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }  
})

// Update a Companies
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     console.log(id)
     const Companies = await Company.findById(id)
     if(!Companies) return res.status(404).send({error: 'Companies does not exist'})
     //const isValidated = validator.updateValidation(req.body)
     //if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedCompany = await Company.findByIdAndUpdate(id,req.body)
     res.json({msg: 'Companies updated successfully', data: updatedCompany} )
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedCompany = await Company.findByIdAndRemove(id)
     res.json({msg:'Companies was deleted successfully', data: deletedCompany})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 

module.exports = router