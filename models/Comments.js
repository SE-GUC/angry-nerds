const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Commentj = require('../../models/Comments')
const validator = require('../../Validations/CommentsValidations')

//Read
router.get('/', async (req,res) => {
    const Comments = await Commentj.find()
    res.json({data: Comments})
})

//Read By ID
router.get('/:id', async (req,res) => {
    try {
    const id = req.params.id
    const CommentsID = await Commentj.findById(id)
    res.json({data: CommentsID})
}
catch(error) {
    // We will be handling the error later
    console.log(error)
}  
})

// Create a comment
router.post('/', async (req,res) => {
   try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newComment = await Commentj.create(req.body)
    res.json({msg:'Comment was created successfully', data: newComment})
   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }  
})

// Update a Comment
router.put('/:id', async (req,res) => {
    try { 
     const id = req.params.id
     const Commenth = await Commentj.findById(id)
     if(!Commenth) return res.status(404).send({error: 'Comment does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedComment = await Commentj.updateOne(req.body)
     res.json({msg: 'Comment updated successfully' , data: updatedComment})
     
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })
//Delete Comment
 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedComment = await Commentj.findByIdAndRemove(id)
     res.json({msg:'Comment was deleted successfully', data: deletedComment})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  


 })

 

module.exports = router