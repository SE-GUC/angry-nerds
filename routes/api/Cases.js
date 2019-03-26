<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const projection =  { _id: 0,  managers:1}
const Case = require('../../models/Cases')
const fun=require('./Cases_func')
const validator = require('../../validations/caseValidations')



// show case
router.get('/', async (req,res) => {
    try{
    const Cases = await Case.find()
    res.json({data: Cases})
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
    // const isValidated = validator.createValidation(req.body)
    // if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newCase = await Case.create(req.body)
    res.json({msg:'Case was created successfully', data: newCase})
   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }  
})




router.post('/FillForm/:id', async (req,res) => {
    console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
   // console.log(req)
    //console.log(req.body.form_type)
    try {

       const id=req.params.id
       const investor=await Investor.findById(id)
       if(!investor) {
           const lawyer= await Staff.findById(id)
           if(!lawyer) return res.status(404).send({error: 'you r not allowed to fill a form, u r neither a lawyer nor an investor' })

           if(lawyer.Type==='Lawyer'){
               var temp="Lawyer"
               //var temp={ "form_type": 1,"regulated_law":1,"arabic_name": 1,"english_name": 1,"government": 1, "city": 1,"hq_address": 1,"hq_city":1,"main_center_phone":1,"main_center_fax":1,"currency":1,"equality_capital":1, "caseStatus":"Lawyer","caseOpenSince":0,"caseClosedDate":0,"reviewerID":0,"lawyerID":0,"investorID":0}
              /* onst newForm = await Case.create(form_type=req.body.form_type,
               "regulated_law"=req.body.regulated_law,
               "arabic_name"=req.body,arabic_name,
               "english_name"
               )*/
            }
            else{return res.status(404).send({error: 'you r not allowed to fill a form, u r neither a lawyer nor an investor' })}

           }
           else{var temp="Investor"}
           // var temp={ "form_type": 1,"regulated_law":1,"arabic_name": 1,"english_name": 1,"government": 1, "city": 1,"hq_address": 1,"hq_city":1,"main_center_phone":1,"main_center_fax":1,"currency":1,"equality_capital":1, "caseStatus":"Investor","caseOpenSince":0,"caseClosedDate":0,"reviewerID":0,"lawyerID":0,"investorID":0}  
           
 

            const newForm = await Case.create(req.body)
            console.log('llllllllllllllllllllllllllllllllllllllllllll')
            console.log(newForm)
            //console.log(newForm.id)
            const casecreated=await Case.findByIdAndUpdate(newForm.id,{"caseStatus":temp})
            console.log("000000000000000000000000000000")
            console.log(newForm)
            console.log("000000000000000000000000000000")
            console.log(casecreated)






            //newForm.caseStatus=temp
            
            res.json({msg:'Form was created successfully', data: newForm})
       // console.log('llllllllllllllllllllllllllllllllllllllllllll')
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
    //  const isValidated = validator.updateValidation(req.body)
    //  if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
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
    // We will be handling the error later kkkkkk
    console.log(error)
}  


})





 
=======
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const projection = { _id: 0, managers: 1 }
const stripe = require('stripe')('sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0')
const Case = require('../../models/Cases')
const fun = require('./Cases_func')
const validator = require('../../validations/caseValidations')

global.revenues159 = 51
global.revenues72 = 100
global.debt159 = 5
global.debt72 = 6

// show case
router.get('/', async (req, res) => {

    try {
        const Cases = await Case.find()
        res.json({ data: Cases })
    }
    catch (error) {
        res.json({ msg: 'There are no cases' })
    }

})
router.get('/CompViewing', async (req, res) => {

    try {
        var Case = await Cases.find({ caseStatus: 'published' }, projx)

        for (var i = 0; i < Case.length; i++) {

            const idf = '5c94eb58f29b9c3e28a80d05'
            const Invs = await Investor.findById(idf)
            const stf = await Staff.findById(idf)
            if (stf) {
                var projx = { '_id': 0, 'reviewerID': 0, 'lawyerID': 0, 'investorID': 0 }

            } else if (Invs) {
                var projx = { '_id': 0, 'reviewerID': 0, 'lawyerID': 0, 'investorID': 0, 'equality_capital': 0, 'currency': 0 }
            } else {
                var projx = {
                    '_id': 0, 'arabic_name': 1, 'english_name': 1, 'government': 1, 'city': 1
                    , 'hq_address': 1, 'hq_city': 1, 'hq_state': 1, 'main_center_phone': 1, 'main_center_fax': 1
                }
            }

            Case = await Cases.find({ caseStatus: 'published' }, projx)
            res.json({ data: Case })
        }
    }


    catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const Cases = await Case.findById(id)
        res.json({ data: Cases })
    }
    catch{
        res.json({ msg: 'The case with the chosen id does not exist' })
    }

})

router.get('/ViewBoardOfDirectorsEng/:english_name', async (req, res) => {
    const english_na = req.params.english_name
    var query = { english_name: english_na }
    const Cases = await Case.find(query, projection)
    if (Cases === null) {
        res.json({ msg: 'Can not find company' })
    }
    else {
        res.json({ data: Cases })
    }
})

router.get('/ViewBoardOfDirectorsID/:id', async (req, res) => {
    const id = req.params.id
    const Cases = await Case.findById(id, projection)
    if (Cases === null) {
        res.json({ msg: 'Can not find company' })
    }
    else {
        res.json({ data: Cases })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const Cases = await Case.findById(id)
    res.json({ data: Cases })
})



router.post('/charge', async (req, res) => {
    const id = req.params.id
    const invID = '5c77c2b0c5973856f492f33e' //get this from login token
    const CaseID = '5c93c8fb1692ea457895901c' //get this from frontend 

    const myCase = await Case.findById(CaseID)
    console.log(myCase.investorID)
    if (myCase.investorID == invID) {
        stripe.tokens.create({
            card: {
                'number': req.body.name,
                'exp_month': req.body.month,
                'exp_year': req.body.year,
                'cvc': req.body.cvc
            }
        }, function (err, token) {
            if (err) return res.json({message: 'card declinded'})
            else {
                console.log(token)
                var chargeAmount = 30000
                var charge = stripe.charges.create({
                    amount: chargeAmount,
                    currency: 'usd',
                    source: token.id
                }, async function (err) {
                    console.log(err)
                    if (err){
                        return res.json({message:'your card is declined, try again!'})
                    }                    
                    else{
                        const casecreated = await Case.findByIdAndUpdate(CaseID, { 'caseStatus': 'published' })
                        return res.json({message: 'your payment has been made; you will receive an invoice via your mail'})
                    }
                        
                })

            }


        })

    }
    else 
        return res.json({message: 'you cannot pay for company that is not yours '})



    console.log(req.body)

})





// Create a case
router.post('/', async (req, res) => {
    try {

        //   const isValidated = validator.createValidation(req.body)
        //  if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

        var i = await CheckForms(req.body)
        console.log(i)
        if (i === -1) {
            res.json({ msg: 'Could not create case' })
        }
        else {
            const newCase = await Case.create(req.body)
            res.json({ msg: 'Case was created successfully', data: newCase })
        }


    }
    catch (error) {
        // We will be handling the error later
        //res.json({msg: 'Please enter a unique name'} )
        console.log(error)
    }
})




router.post('/FillForm/:id', async (req, res) => {
    try {

        const id = req.params.id
        const investor = await Investor.findById(id)
        if (!investor) {
            const lawyer = await Staff.findById(id)
            if (!lawyer) return res.status(404).send(
                { error: 'you r not allowed to fill a form, u r neither a lawyer nor an investor' });

            if (lawyer.Type === 'Lawyer') {
                var temp = 'Lawyer'

            }
            else { return res.status(404).send({ error: 'you r not allowed to fill a form, u r neither a lawyer nor an investor' }); }

        }
        else { var temp = 'Investor' }

        const newForm = await Case.create(req.body)
        const casecreated = await Case.findByIdAndUpdate(newForm.id, { 'caseStatus': temp })
        console.log(newForm)
        console.log(casecreated)

        res.json({ msg: 'Form was created successfully', data: newForm })
    }

    catch (error) {
        // We will be handling the error later
        console.log(error)
    }

})


router.put('/updateForm/:idu/:idf', async (req, res) => {
    try {
        const idu = req.params.idu
        const idf = req.params.idf
        const form = await Case.findById(idf)
        const investor = await Investor.findById(idu)
        if (!form) return res.status(404).send({ error: 'The Form does not exist' });
        if (!investor) {
            const lawyer = await Staff.findById(idu)
            if (!lawyer) return res.status(404).send({ error: 'you r not allowed to update the form, u r neither a lawyer nor an investor' });

            if (lawyer.Type === 'Lawyer') {
                var updatedCase = await Case.findByIdAndUpdate(idf, req.body)
            }
            else { return res.status(404).send({ error: 'you r not allowed to update form, u r neither a lawyer nor an investor' }); }

        }
        else {
            var updatedCase = await Case.findByIdAndUpdate(idf, req.body)
        }

        res.json({ msg: 'Form updated successfully', data: updatedCase })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})


// Update a case
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const Cases = await Case.findById(id)
        if (!Cases) return res.status(404).send({ error: 'Cases does not exist' });
        //   const isValidated = validator.updateValidation(req.body)
        //  if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        var i = CheckForms(req.body)
        if (i === -1) {
            res.json({ msg: 'Could not create case' })
        }
        else {
            const updatedCase = await Case.findByIdAndUpdate(id, req.body)
            res.json({ msg: 'Case updated successfully', data: updatedCase })
        }

    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})





// delete a case
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedCase = await Case.findByIdAndRemove(id)
        res.json({ msg: 'Case was deleted successfully', data: deletedCase })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})



router.get('/CmpViewing/:id', async (req, res) => {

    try {
        const id = req.params.id
        var Case = await Cases.findById(id)
        if (Case.caseStatus === 'published') {

            const idf = '5c77c2b0c5973856f492f33e'
            const Invs = await Investor.findById(idf)
            const stf = await Staff.findById(idf)
            if (stf) {
                var proj1 = { 'reviewerID': 0, 'lawyerID': 0, 'InvestorID': 0 }

            } else if (Invs) {
                var proj1 = { 'reviewerID': 0, 'lawyerID': 0, 'InvestorID': 0, 'equality_capital': 0, 'currency': 0 }
            } else {
                var proj1 = {
                    '_id': 0, 'arabic_name': 1, 'english_name': 1, 'government': 1, 'city': 1,
                    'hq_address': 1, 'hq_city': 1, 'hq_state': 1, 'main_center_phone': 1, 'main_center_fax': 1
                }
            }
            Case = await Cases.findById(id, proj1)
            res.json({ data: Case })
        }
        else {
            res.json({ msg: 'Case was not published' })

        }
    }
    catch (error) {
        console.log(error)
    }


})



//Assign Lawyer
router.put('/AssignLawyer/:id/:id1', async (req, res) => {

    //check if I am admin
    try {
        var x = '5c9553126e4cb565a02e1089'
        const admin = await Staff.findById(x)
        console.log(admin)
        if (admin.Type === 'Admin') {
            const id = req.params.id
            const id1 = req.params.id1
            console.log(id)
            const Cases = await Case.findById(id)
            const staff = await Staff.findById(id1)
            // if(Cases.lawyerID != null )
            // res.json({msg: 'Case already assigned to a lawyer'})
            //else{
            if (staff.Type === 'Lawyer') {
                const updatedCase = await Case.updateOne({ _id: id }, { $set: { lawyerID: id1 } })

                res.json({ msg: 'Case updated successfully', data: updatedCase })
            }
            else
                res.json({ msg: 'Please select a valid lawyer' })

        }
        //  }
        //  else
        //  res.json({msg:'Only Admins can perform this action'})
    }


    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})




//Assign Reviewer

router.put('/AssignReviewer/:id/:id1', async (req, res) => {
    //check if I am admin
    try {
        const id = req.params.id
        const id1 = req.params.id1
        console.log(id)
        const Cases = await Case.findById(id)
        const staff = await Staff.findById(id1)
        console.log(staff)
        // if(Cases.reviewerID >= null )
        //res.json({msg: 'Case already assigned to a reviewer'})
        // else{
        if (staff.Type === 'Reviewer') {
            const updatedCase = await Case.updateOne({ _id: id }, { $set: { reviewerID: id1 } })

            res.json({ msg: 'Case updated successfully', data: updatedCase })
        }
        else
            res.json({ msg: 'Please select a valid reviewer' })

        //}
    }
    catch (error) {
        // We will be handling the error later kkkkkk
        console.log(error)
    }


})



// Fady M updates
router.put('/calc_fees/:id', async (req, res) => {
    try {
        const id = req.params.id
        const Cases = await Case.findById(id)


        var type = Cases.regulated_law
        if (type === 'Law 159') {
            var x = Cases.equality_capital
            var gafi = .001 * x
            var notary = .0025 * x
            if (gafi < 100) {
                gafi = 100
            }
            if (gafi > 1000) {
                gafi = 1000
            }
            if (notary < 10) {
                notary = 10
            }
            if (notary > 1000) {
                notary = 1000
            }
            var fee = global.revenues159 + global.debt159 + gafi + notary
            const updatedCase = await Case.findByIdAndUpdate(id, { 'fees': fee })
            res.json({ msg: 'Fees calculated', data: 'Fees : ' + fee })
        }
        else if (type === 'Law 72') {
            var fee = global.revenues72 + global.debt72
            const updatedCase = await Case.findByIdAndUpdate(id, { 'fees': fee })
            console.log('GOT')
            res.json({ msg: 'Fees calculated', data: 'Fees : ' + fee })
        }
        else {
            res.json({ msg: 'not correct law', data: updatedCase })
        }
    }

    catch (error) {
        console.log(error)
    }

})


router.get('/track_case/:id', async (req, res) => {
    try {
        const id = req.params.id
        const Cases = await Case.findById(id)
        var x = Cases.caseStatus
        res.json({ msg: 'Your case is at', data: x })
    }

    catch (error) {
        console.log(error)
    }

})

router.put('/admin_assign_lawyer/:caseId/:lawyerId', async (req, res) => {
    try {
        const caseId = req.params.caseId
        const lawyerId = req.params.lawyerId
        fun.admin_assign_lawyer(caseId, lawyerId)
        res.json({ msg: 'A case is assigned successfully' })
    }

    catch (error) {
        console.log(error)
    }

})

router.put('/admin_assign_reviewer/:caseId/:reviewerId', async (req, res) => {
    try {
        const caseId = req.params.caseId
        const reviewerId = req.params.reviewerId
        fun.admin_assign_lawyer(caseId, reviewerId)
        res.json({ msg: 'A case is assigned successfully' })
    }

    catch (error) {
        console.log(error)
    }

})
router.put('/system_assign_lawyer/:caseId', async (req, res) => {
    try {
        const caseId = req.params.caseId
        fun.system_assign_lawyer(caseId)
        res.json({ msg: 'A case is assigned successfully' })
    }


    // //Function for checking the rules of the form


    catch (error) {
        console.log(error)
    }

})
CheckForms = async function (data) {
    var query = { _id: data.investorID, form_type: 'SSC' }


    const AllCases = await Case.find(query)
    const inv = await Investor.findById(data.investorID)

    //console.log(AllCases)

    if (data.form_type === 'SSC') {
        if (data.equality_capital < 50000) {
            console.log('SSC must have a minimum capital of 50000')
            return -1;
        }

        if (inv.Nationality != 'Egyptian') {
            var i
            var a2 = false

            for (i = 0; i < data.managers.length; i++) {
                if (data.managers[i].nationallity === 'Egyptian')
                    a2 = true
                console.log('here')
            }
            if (a2 === false) {
                console.log('SSC must have at least 1 egyptian manager')
                return -1;
            }
        }

        var y
        for (y = 0; y < AllCases.length; y++) {
            if (AllCases) {
                console.log('1 Investor can only have 1 SSC company')
                return -1;
            }
        }

    }

    else {

        // console.log(inv)
        if (inv.Nationality != 'Egyptian') {
            //console.log(data.investorID)
            if (data.equality_capital < 100000) {
                console.log('Capital must be greater than 100000')
                return -1;
            }

            if (data.managers.length > 0) {
                //console.log(data.managers.length)
                console.log('SPC Companies should not have any managers')
                return -1;
            }
        }

    }


}

router.put('/system_assign_reviewer/:caseId', async (req, res) => {
    try {
        const caseId = req.params.caseId
        fun.admin_assign_lawyer(caseId)
        res.json({ msg: 'A case is assigned successfully' })
    }

    catch (error) {
        console.log(error)
    }

})


//view fees
router.get('/ViewFees/:id', async (req, res) => {
    const id = req.params.id
    const Cases = await Case.findById(id, projection)
    if (Cases === null) {
        res.json({ msg: 'Can not find company' })
    }
    else {
        res.json({ data: Cases.Fees })
    }
})

// keep track of time taken to finish a case

module.exports.ViewTime = async function (Data) {
    const id = req.params.id
    const Cases = await Case.findById(id)
    var d1 = new Date(Cases.caseOpenSince)
    if (!Cases) {
        res.json({ msg: 'Cannot find case' })
    }
    else {
        console.log(Cases.caseClosedDate)
        if (Cases.caseClosedDate != null) {
            var d2 = new Date(Cases.caseClosedDate)
            var timeDiff = Math.abs(d2.getTime() - d1.getTime())
            var daysBetween = Math.ceil(timeDiff / (1000 * 3600 * 24))
            console.log(timeDiff)
            console.log(daysBetween)
            res.json({ data: daysBetween })
        }
        else {
            res.json({ msg: 'Case not finished' })
        }

    }
}
router.get('/CmpViewing/:id', async (req, res) => {

    try {
        const id = req.params.id
        var Case = await Cases.findById(id)
        if (Case.caseStatus === 'published') {

            const idf = '5c77c2b0c5973856f492f33e'
            const Invs = await Investor.findById(idf)
            const stf = await Staff.findById(idf)
            if (stf) {
                var proj1 = { 'reviewerID': 0, 'lawyerID': 0, 'InvestorID': 0 }

            } else if (Invs) {
                var proj1 = { 'reviewerID': 0, 'lawyerID': 0, 'InvestorID': 0, 'equality_capital': 0, 'currency': 0 }
            } else {
                var proj1 = {
                    '_id': 0, 'arabic_name': 1, 'english_name': 1, 'government': 1, 'city': 1, 'hq_address': 1
                    , 'hq_city': 1, 'hq_state': 1, 'main_center_phone': 1, 'main_center_fax': 1
                }
            }
            Case = await Cases.findById(id, proj1)
            res.json({ data: Case })
        }
        else {
            res.json({ msg: 'Case was not published' })

        }
    }
    catch (error) {
        console.log(error)
    }
})

>>>>>>> dacd51936c7b6c8fcd7e45613ff3c15da1f8347d
module.exports = router