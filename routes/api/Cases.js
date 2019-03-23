const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const stripe = require('stripe')('sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0')
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


router.post('/charge',async (req,res)=>{
    const id = req.params.id
    const invID = '5c77c2b0c5973856f492f33e' //get this from login token
    const CaseID = '5c93c8fb1692ea457895901c' //get this from frontend 

    const myCase = await Case.findById(CaseID) 
    if( myCase.investorID === invID){
        stripe.tokens.create({
            card: {
                "number": req.body.name,
                "exp_month": req.body.month,
                "exp_year": req.body.year,
                "cvc": req.body.cvc
            }
        }, function (err, token){
            if(err) console.log(err)
            else{
                    console.log(token)
                    var chargeAmount = 30000
                    var charge = stripe.charges.create({
                    amount: chargeAmount,
                    currency: "usd",
                    source: token.id 
                },function (err){
                    if(err)
                        console.log('your card is declined') 
                    else
                        console.log('payment successful')
                })
    
            }
    
        
    })

    }
    else console.log('you cannot pay fees for a form that is not yours')
    
    

    console.log(req.body)
    ;})



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

 

module.exports = router