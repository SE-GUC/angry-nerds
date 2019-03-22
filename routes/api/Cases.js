const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const projection =  { _id: 0,  managers:1}
const Case = require('../../models/Cases')
const validator = require('../../Validations/caseValidations')

router.get('/', async (req,res) => {
   const Cases = await Case.find()
    res.json({data: Cases})
})

router.get('/:id', async (req,res) => {
	const id = req.params.id
     const Cases = await Case.findById(id)
    res.json({data: Cases})
})

router.get('/ViewBoardOfDirectorsEng/:english_name', async (req,res) => {
    const english_na = req.params.english_name;
    var query = { english_name: english_na };
    const Cases = await Case.find(query,projection);
    if(Cases === null){
      res.json({msg:'Can not find company'})
    }
    else{
        res.json({data: Cases})
    }
})

router.get('/ViewBoardOfDirectorsID/:id', async (req,res) => {
    const id = req.params.id;
    const Cases = await Case.findById(id,projection);
    if(Cases === null){
      res.json({msg:'Can not find company'})
    }
    else{
        res.json({data: Cases})
    }
})





// Create a case
router.post('/', async (req,res) => {
   try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newCase = await Case.create(req.body)
    res.json({msg:'Case was created successfully', data: newCase})
   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }  
})

// Update a case
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     console.log(id)
     const Cases = await Case.findById(id)
     if(!Cases) return res.status(404).send({error: 'Cases does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedCase = await Case.findByIdAndUpdate(id, req.body)
     res.json({msg: 'Case updated successfully', data: updatedCase} )
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedCase = await Case.findByIdAndRemove(id)
     res.json({msg:'Case was deleted successfully', data: deletedCase})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 router.get('/CmpViewing/:id', async (req, res)=>{

    try{
        const id = req.params.id
        var Case = await Cases.findById(id)
   if(Case.caseStatus === "published"){

       const idf = "5c77c2b0c5973856f492f33e"
       const Invs = await Investor.findById(idf)
       const stf = await Staff.findById(idf)
       if (stf){ 
           var proj1 = {"reviewerID": 0 , "lawyerID": 0, "InvestorID":0}

       }else if (Invs) {            
           var proj1 = {"reviewerID": 0 , "lawyerID": 0, "InvestorID":0, "equality_capital":0 , "currency":0 }
       } else {
       var proj1 = {"_id":0, "arabic_name": 1,  "english_name" : 1,  "government":1,  "city": 1 ,"hq_address": 1 ,"hq_city" :1  ,"hq_state": 1 ,"main_center_phone":1, "main_center_fax":1 };
       }
       Case = await Cases.findById(id,proj1)
       res.json({data: Case})
       } 
       else{
           res.json({msg:'Case was not published'})

       }
   }
       catch(error){
           console.log(error)
       }
})

module.exports = router