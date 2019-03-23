const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const projection =  { _id: 0,  managers:1}
const Case = require('../../models/Cases')
const validator = require('../../Validations/caseValidations')


// show case
router.get('/', async (req,res) => {
    const Cases = await Case.find()
    res.json({data: Cases})
})
router.get('/CompViewing', async (req ,res)=>{
                    
    try{
         var Case = await Cases.find({caseStatus:"published"},projx)
                             
         for (var i = 0; i < Case.length; i++) { 
                       
             const idf = "5c94eb58f29b9c3e28a80d05"
             const Invs = await Investor.findById(idf)
             const stf = await Staff.findById(idf)
             if (stf){ 
             var projx = {"_id":0, "reviewerID": 0 , "lawyerID": 0, "investorID":0}
                                             
             }else if (Invs) {            
             var projx = {"_id":0, "reviewerID": 0 , "lawyerID": 0, "investorID":0, "equality_capital":0 , "currency":0 }
             } else {
             var projx = {"_id":0, "arabic_name": 1,  "english_name" : 1,  "government":1,  "city": 1 ,"hq_address": 1 ,"hq_city" :1  ,"hq_state": 1 ,"main_center_phone":1, "main_center_fax":1 };
             }

             Case = await Cases.find({caseStatus:"published"},projx)
             res.json({data: Case})
             }
             } 
                                     
             
             catch(error){
             console.log(error)
  }
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



 // delete a case
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





 //Assign Lawyer
 router.put('/AssignLawyer/:id/:id1', async(req,res) =>{    
    //check if I am admin
    try { 
        
      //  var admin= await Staff.findById("5c94da8a60697b45f0949cd9")
       // if(admin.Type ==="Admin"){
        const id = req.params.id
        const id1= req.params.id1
        console.log(id)
        const Cases = await Case.findById(id)
        const staff= await Staff.findById(id1)
       // if(Cases.lawyerID != null )
       // res.json({msg: 'Case already assigned to a lawyer'})
        //else{
            if( staff.Type === "Lawyer"){
                const updatedCase= await Case.updateOne({_id:id},{$set: {lawyerID:id1}});

                 res.json({msg: 'Case updated successfully', data: updatedCase} )
            }
            else
            res.json({msg: 'Please select a valid lawyer'})
        
        //}
  //  }
   //  else
          //  res.json({msg:"Only Admins can perform this action"})
}
 
         
catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
})




//Assign Reviewer

router.put('/AssignReviewer/:id/:id1', async(req,res)=>{
//check if I am admin
try {
    const id = req.params.id
    const id1= req.params.id1
    console.log(id)
    const Cases = await Case.findById(id)
    const staff= await Staff.findById(id1)
    console.log(staff)
   // if(Cases.reviewerID >= null )
    //res.json({msg: 'Case already assigned to a reviewer'})
   // else{
        if( staff.Type === "Reviewer"){
            const updatedCase= await Case.updateOne({_id:id},{$set: {reviewerID:id1}});

             res.json({msg: 'Case updated successfully', data: updatedCase} )
        }
        else
        res.json({msg: 'Please select a valid reviewer'})
    
    //}
}
catch(error) {
    // We will be handling the error later
    console.log(error)
}  

})





 

module.exports = router