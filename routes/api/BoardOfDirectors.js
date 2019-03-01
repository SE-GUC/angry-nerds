const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Board = require('../../models/BoardOfDirectors')
const validator = require('../../Validations/boardValidations')

router.get('/', async (req,res) => {   //get all board's directors
    const directors = await Board.find()
    res.json({data: directors})
})

router.get('/:id', async (req,res) => {  //get a specific director according to his id
	const id = req.params.id
     const director = await Board.findById(id)
    res.json({data: director})
})





router.post('/', async (req,res) => {  // add a new director to the board
   try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newDirector = await Board.create(req.body)
    res.json({msg:'The new Director was created successfully', data: newDirector})
   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }  
})

// Update  the board
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     console.log(id)
     const director = await Board.findById(id)
     if(!director) return res.status(404).send({error: 'The specified director does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedDirector = await Board.findByIdAndUpdate(id, req.body)
     res.json({msg: 'Director updated successfully', data: updatedDirector} )
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedDirector = await Board.findByIdAndRemove(id)
     res.json({msg:'The specified director was deleted successfully', data: deletedDirector})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 

module.exports = router