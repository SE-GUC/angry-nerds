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

    var i= await CheckForms(req.body)
    console.log(i)
    if(i === -1){
        res.json({msg:'Could not create case'})
    }
    else{
        const newCase = await Case.create(req.body)
        res.json({msg:'Case was created successfully', data: newCase})
    }
    
   }
   catch(error) {
       // We will be handling the error later
       //res.json({msg: 'Please enter a unique name'} )
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
     var i= CheckForms(req.body)
     if(i === -1){
        res.json({msg: 'Could not create case'})
     }
     else{
          const updatedCase = await Case.findByIdAndUpdate(id, req.body)
     res.json({msg: 'Case updated successfully', data: updatedCase} )
     }
    
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




 //Assign Lawyer
 router.put('/AssignLawyer/:id/:id1', async(req,res) =>{    
    //check if I am admin
    try { 
        var x="5c9553126e4cb565a02e1089"
        const admin= await Staff.findById(x)
        console.log(admin)
        if(admin.Type === 'Admin'){
        const id = req.params.id
        const id1= req.params.id1
        console.log(id)
        const Cases = await Case.findById(id)
        const staff= await Staff.findById(id1)
        
       // if(Cases.lawyerID != null )
       // res.json({msg: 'Case already assigned to a lawyer'})
        //else{
            console.log(staff)
            if( staff.Type === 'Lawyer'){
                const updatedCase= await Case.updateOne({_id:id},{$set: {lawyerID:id1}})

                 res.json({msg: 'Case updated successfully', data: updatedCase} )
            }
            else
            res.json({msg: 'Please select a valid lawyer'})
        
        }
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
    var x="5c9553126e4cb565a02e1089"
    const admin= await Staff.findById(x)
    console.log(admin)
    if(admin.Type === 'Admin'){
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
    
    }
}
catch(error) {
    // We will be handling the error later
    console.log(error)
}  

})

// //Function for checking the rules of the form
CheckForms = async function(data){
    var query= {_id:data.investorID, form_type: "SSC"}
    
    
    const AllCases = await Case.find(query)
    
    //console.log(AllCases)

    if (data.form_type === "SSC"){
        if (data. equality_capital< 50000) {
        console.log('SSC must have a minimum capital of 50000')
        return -1
        }

        if (data.investorID.Nationality != 'Egyptian'){
        var i
        var a2 = false

        for (i = 0; i < data.managers.length; i++) { 
          if (data.managers[i].nationallity === 'Egyptian')
              a2= true
              console.log('here')
        }
          if (a2 === false) {
            console.log('SSC must have at least 1 egyptian manager')
             return -1
          }
        }
        
        var y
        for(y=0; y < AllCases.length; y++){
            
        }
        if ( AllCases ) {
          console.log('1 Investor can only have 1 SSC company')
          return -1
     }
    



    }

    else {
        if (data.investorID.Nationality != 'Egyptian'){
            if(data.equality_capital <100000){
                console.log('Capital must be greater than 100000')
                return -1
            }
    
        if(data.managers.length>0){
            console.log('SPC Companies should not have any managers')
            return -1
        }
    }

}


}
 

module.exports = router