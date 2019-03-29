const validator = require('../../validations/caseValidations')
const stripe = require('stripe')('sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0')
const Case = require('./../models/Cases')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

let InvestorController = {

    /*
    this is a function that takes a request body that contains credit card info
    it creates a token of this info and then it creates a charge
    when the payment is successfully complete the case status is changed to published
    */
    InvestorPayFees: async function (req, res) {
        const id = req.params.id
        const invID = '5c77c2b0c5973856f492f33e' //get this from login token
        const CaseID = '5c94df653c95ff18c8866d52' //get this from frontend 

        const myCase = await Case.findById(CaseID)

        if(!myCase)
            res.json({msg: 'this case does not exist'})
            
        console.log(myCase)
        if (myCase.investorID == invID) {
            stripe.tokens.create({
                card: {
                    'number': req.body.name,
                    'exp_month': req.body.month,
                    'exp_year': req.body.year,
                    'cvc': req.body.cvc
                }
            }, function (err, token) {
                if (err) return res.json({ message: 'card declinded' })
                else {
                    console.log(token)
                    var chargeAmount = 30000
                    var charge = stripe.charges.create({
                        amount: chargeAmount,
                        currency: 'usd',
                        source: token.id
                    }, async function (err) {
                        console.log(err)
                        if (err) {
                            return res.json({ message: 'your card is declined, try again!' })
                        }
                        else {
                            const casecreated = await Case.findByIdAndUpdate(CaseID, { 'caseStatus': 'published' })
                            return res.json({ message: 'your payment has been made; you will receive an invoice via your mail' })
                        }

                    })

                }


            })

        }
        else
            return res.json({ message: 'you cannot pay for company that is not yours ' })

        console.log(req.body)

    },
    /* delete cases with investor_id and the case is not published yet*/

deleteInvestor:async (id) =>
{
    try {
      //  const id = req.params.id
        mongoose.set('useFindAndModify', false)
        const deletedInvestor = await Investor.findByIdAndRemove(id)
        const query = { investorID: id }
        const deletedCases = await Case.find(query)
        for (let i = 0; i < deletedCases.length; i += 1) {
            if (deletedCases[i].caseStatus !== 'published') {
                await Case.findByIdAndRemove(deletedCases[i]._id) 
                // delete cases controller to be called
             }
         } 
         return
    }
    catch (error) {
    }

},

investorFillForm:async(req,res)=>{

    try{ 
        const id = '5c77e91b3fd76231ecbf04ee'
        const investor = await Investor.findById(id)


        if (!investor)
             return res.status(404).send({ error: 'You are not allowed to fill this form' });
    
        const newForm = await Case.create(req.body)
        const casecreated = await Case.findByIdAndUpdate(newForm.id, {  'caseStatus': 'lawyer-investor',
                                                                        'caseOpenSince': new Date(),
                                                                        'lawyerStartDate':new Date(),
                                                                        'investorID':investor })
        res.json({ msg: 'The form was created successfully' })

    }
    catch (error) {
        console.log(error)
        return res.status(404).send({ error: 'Form cant be created' })
    }



},


investorUpdateForm:async(id)=>{
    try{
        const investorid = '5c77e91b3fd76231ecbf04ee'
        const investor = await Investor.findById(investorid)
        const form = await Case.findById(id)
        if (!investor)
             return res.status(404).send({ error: 'You are not allowed to update this form' });
        if (!form)
             return res.status(404).send({ error: 'The form you are trying to update does not exist' });
        var updatedForm = await Case.findByIdAndUpdate(id, req.body)
        res.json({ msg: 'Form updated successfully', data: updatedForm })

    }
    catch(error){
        return res.status(404).send({ error: 'Form cant be updated' })


    }
},


investorViewComment:async(req,res)=>{
try{
    const formid='5c9cfd1d05f1d42e68b75fb7'
    const investorid = '5c77e91b3fd76231ecbf04ee'
    const investor = await Investor.findById(investorid)
    const form = await Case.findById(formid)
    /*console.log(form)
    console.log(formid)
    console.log(form.investorID)
    console.log(investorid)*/
    if (!form)
      return res.status(404).send({ error: 'The form does not exist' });
    if (!investor)
      return res.status(404).send({ error: 'You are not allowed to view this comment, You are not an investor' });
    if (form.investorID.toString() === investorid.toString()){ 
      //  console.log('hhhhhhhhhhhhhhhhhhhhhhh')
        return res.json({ data: form.comment });}
    else{
        return res.status(404).send({ error: 'You are not allowed to view this comment, You are not the investor of this company' });
    }
}
catch(error){
    console.log(error)
    return res.status(404).send({ error: 'Comment cant be viewed' })

}


}

}

module.exports = InvestorController;
