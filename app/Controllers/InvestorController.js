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
        const deletedInvestor = await Investor.findByIdAndRemove(id)
        const query = { investorID: id }
        const deletedCases = await Case.find(query)
        for (let i = 0; i < deletedCases.length; i += 1) {
            if (deletedCases[i].caseStatus !== 'published') {
                await Case.findByIdAndRemove(deletedCases[i]._id) 
                // delete cases controller to be called
             }
         } 
        res.json({ msg: 'Investor was deleted successfully' })
    }
    catch (error) {
        return res.status(404).send({ error: 'Can not perform this action' })
    }

}



}


module.exports = InvestorController;