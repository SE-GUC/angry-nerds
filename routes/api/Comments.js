const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Commentj = require('../../models/Comments')
const validator = require('../../Validations/CommentsValidations')
const Cases = require('../../models/Cases')


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


router.get('/view/:idf/:idu', async (req,res) => {
    try {
    const idf = req.params.idf
    const idu = req.params.idu
   //const projection = {comment:1}
    
    const Case = await Cases.findById(idf)//,projection)
    const investor=await Investor.findById(idu)
     if(!Case) return res.status(404).send({error: 'The comment does not exist'})
     if(!investor) {
        const staff= await Staff.findById(idu)
        if(!staff){ 
            return res.status(404).send({error: 'you r not allowed to view comments on a form, u r neither a lawyer nor an investor' })
        }
        else{
            if(staff.Type === 'Lawyer' && Case.lawyerID === idu){
                return res.json({data: Case.comment})
            }else{
                if(staff.Type === 'Reviewer' && Case.reviewerID === idu){
                    return res.json({data: Case.comment})
                }
                else{
                    if(staff.Type === 'Admin'){
                        return res.json({data: Case.comment})
                    }
                    else{
                        return res.status(404).send({error: 'you r not allowed to view comments on a form, u r neither a lawyer nor an investor' }) 
                    }
                }
            }
        } 
    }
    else{
        if(Case.investorID === idu){            
            return res.json({data: Case.comment})
        }
        else{
            return res.status(404).send({error: 'you r not allowed to view comments on a form, u r neither a lawyer nor an investor' }) 
        }    
    }

    
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