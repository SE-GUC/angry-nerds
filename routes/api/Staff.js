const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Staff = require('../../models/Staff')
const validator = require('../../validations/staffValidations')

router.get('/', async (req,res) => {
    const staffi = await Staff.find()
    res.json({data: staffi})
})
router.get('/:id', async (req,res) => {
    const id = req.params.id
    const staffi = await Staff.findById(id)
    res.json({data: staffi})
})


// Create a staff
router.post('/', async (req,res) => {
   try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newStaff = await Staff.create(req.body)
    res.json({msg:'Staff was created successfully', data: newStaff})
   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }  
})

// Update a staff
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const staff = await Staff.findById(id)
     if(!staff) return res.status(404).send({error: 'Staff does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedStaff = await Staff.findByIdAndUpdate(id,req.body)
     res.json({msg: 'Staff updated successfully'})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedStaff = await Staff.findByIdAndRemove(id)
     res.json({msg:'Staff was deleted successfully', data: deletedStaff})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 router.get('/StfViewing/:id', async (req, res)=>{
    const idf = "5c77c2b0c5973234f492f33e"
     const Invs = await Investor.findById(idf)
     const stf = await Staff.findById(idf)
    if ( stf || Invs)
    var proj = {"_id": 0 , "password": 0}
    else
    var proj = {"_id":0, "firstName": 1,  "MiddleName" : 1,  "LastName":1,  "Nationality": 1 ,"Address": 1 ,"birthdate" :1  ,"telephone_number": 1 ,"gender":1};
    
   try{
       const id = req.params.id
        const Staf = await Staff.findById(id,proj)
        res.json({data: Staf})
   } 
   catch(error){
    console.log(error)
   }
})

module.exports = router
