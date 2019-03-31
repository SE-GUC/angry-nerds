const validator = require('../../validations/caseValidations')
const stripe = require('stripe')('sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0')
const Case = require('./../models/Cases')
const Investor = require('./../models/Investor')
const Notification = require('./../models/Notifications')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const pdfMakePrinter = require('pdfmake/src/printer')


let InvestorController = {

    /* 
    this is a function that takes a request body that contains credit card info
    it creates a token of this info and then it creates a charge
    when the payment is successfully complete the case status is changed to published
    */
    InvestorPayFees: async function (req, res) {
        const id = req.params.id
        const invID = '5c77c2b0c5973856f492f33e' //get this from login token
        const CaseID = '5c93dd90806ede138da94bda' //get this from frontend 

        const myCase = await Case.findById(CaseID)

        if (!myCase )
            res.json({ message: 'you cannot pay for this company' })

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
                   // console.log(token)
                    var chargeAmount = 30000
                    var charge = stripe.charges.create({
                        amount: chargeAmount,
                        currency: 'usd',
                        source: token.id
                    }, async function (err) {
                       // console.log(err)
                        if (err) {
                            return res.json({ message: 'your card is declined, try again!' })
                        }
                        else {
                            const casecreated = await Case.findByIdAndUpdate(CaseID, { 'caseStatus': 'published' })
                            return res.json({ message: 'your payment has been made; you will receive an invoice via your mail.' })
                        }

                    })

                }

            })

        }
        else
            return res.json({ message: 'you cannot pay for a company that is not yours ' })

        //console.log(req.body)

    },

    /* Malak
    this is a function that takes as an input company id and returns its fees
    it is still under construction because its unlogical since we want anyone be
    be able to view the fees without having to create a company
    i also think this is front end work
    */
    InvestorViewFees: async function (req, res) {
        const id = req.params.id
        const Cases = await Case.findById(id, projection)
        if (Cases === null) {
            res.json({ msg: 'Can not find company' })
        }
        else {
            res.json({ data: Cases.Fees })
        }
    },


    /* delete cases with investor_id and the case is not published yet*/

    deleteInvestor: async (id) => {
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

    investorFillForm: async (req, res) => {

        try {
            const id = '5c77e91b3fd76231ecbf04ee'
            const investor = await Investor.findById(id)


            if (!investor)
                return res.status(404).send({ error: 'You are not allowed to fill this form' });

            const newForm = await Case.create(req.body)
            const casecreated = await Case.findByIdAndUpdate(newForm.id, {
                'caseStatus': 'lawyer-investor',
                'caseOpenSince': new Date(),
                'lawyerStartDate': new Date(),
                'investorID': investor
            })
            res.json({ msg: 'The form was created successfully' })

        }
        catch (error) {
            console.log(error)
            return res.status(404).send({ error: 'Form cant be created' })
        }

    },


    investorUpdateForm: async (id) => {
        try {
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
        catch (error) {
            return res.status(404).send({ error: 'Form cant be updated' })


        }
    },


    investorViewComment: async (req, res) => {
        try {
            const formid = '5c9cfd1d05f1d42e68b75fb7'
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
            if (form.investorID.toString() === investorid.toString()) {
                //  console.log('hhhhhhhhhhhhhhhhhhhhhhh')
                return res.json({ data: form.comment });
            }
            else {
                return res.status(404).send({ error: 'You are not allowed to view this comment, You are not the investor of this company' });
            }
        }
        catch (error) {
            console.log(error)
            return res.status(404).send({ error: 'Comment cant be viewed' })

        }



    },

    /*
        PUT request to change password of the investor
        PARAMS:{ investorID: String }
        BODY:{   oldPassword: String,
                 newPassword: String }
        * Checks if the investor is in the database,
        then checks if the oldPassword matches the one in the database.
        Then changes the password in the database.   
        RETURNS 404 NOT FOUND: if the ID is not in the database.
                403 FORBIDDEN: if the old password does not match the password in the database.
                200 OK: if the password is updated.  
                400 BAD REQUEST: if an exception is thrown.   
    */
    investorChangePassword: async function (req, res) {
        try {
            const id = req.params.id
            const oldPassword = req.body.oldPassword
            const newPassword = req.body.newPassword
            let investor = await Investor.findById(id)
            if (!investor) {
                return res.status(404).json({ error: 'Cannot find an investor account with this ID' })
            }
            else {
                if (oldPassword != investor.password) {
                    return res.status(403).json({ error: 'The passwords do not match' })
                }
                else {
                    const updatedInvestor = await Investor.findByIdAndUpdate(id, {
                        'password': newPassword
                    })
                    investor = await Investor.findById(id)
                    return res.status(200).json({ msg: 'The password was updated', data: investor })
                }
            }
        }
        catch (error) {
            console.log(error)
            return res.status(400).json({ error: 'Error processing query.' })

        }
    },

    /*
        GET request to view the notifications of the investor.
        PARAMS:{ investorID: String }
        * Checks if the investor is in the database,
        then checks gets thier notifications.   
        RETURNS 404 NOT FOUND: if the ID is not in the database.
                200 OK: if it pereforms the query.
                400 BAD REQUEST: if an exception is thrown.   
    */
    investorMyNotifications: async function (req, res) {
        try {
            const id = req.params.id
            let investor = await Investor.findById(id)
            if (!investor) {
                return res.status(404).json({ error: 'Cannot find an investor account with this ID' })
            }
            else {
                let notifications = await Notification.find({ 'receiverInvestor': id })
                return res.status(200).json({ data: notifications })
            }

        }
        catch (error) {
            console.log(error)
            return res.status(400).json({ error: 'Error processing query.' })
        }

    },

    /*
        GET request to view the published companies of the investor.
        PARAMS:{ investorID: String }
        * Checks if the investor is in the database,
        then checks gets thier published cases.   
        RETURNS 404 NOT FOUND: if the ID is not in the database.
                200 OK: if it pereforms the query.
                400 BAD REQUEST: if an exception is thrown.   
    */
    viewMyPublishedCompanies: async function (req, res) {
        try {
            const id = req.params.id
            let investor = await Investor.findById(id)
            if (!investor) {
                return res.status(404).json({ error: 'Cannot find an investor account with this ID' })
            }
            else {
                let cases = await Case.find({ 'caseStatus': 'published', 'investorID': id })
                return res.status(200).json({ data: cases })
            }

        }
        catch (error) {
            console.log(error)
            return res.status(400).json({ error: 'Error processing query.' })
        }
    },

    /*
       GET request to view the published companies of the investor.
       PARAMS:{ investorID: String }
       * Checks if the investor is in the database,
       then checks if the caseStatus != 'published'.   
       RETURNS 404 NOT FOUND: if the ID is not in the database.
               200 OK: if it pereforms the query.
               400 BAD REQUEST: if an exception is thrown.   
   */
    viewMyPendingCompanies: async function (req, res) {
        try {
            const id = req.params.id
            let investor = await Investor.findById(id)
            if (!investor) {
                return res.status(404).json({ error: 'Cannot find an investor account with this ID' })
            }
            else {
                let cases = await Case.find({ 'caseStatus': { $ne: 'published' }, 'investorID': id })
                return res.status(200).json({ data: cases })
            }

        }
        catch (error) {
            console.log(error)
            return res.status(400).json({ error: 'Error processing query.' })
        }
    },


    /*
        GET method to generate a pdf contract based on the case object.
        PARAMS:{ caseID: String }
        * Checks if the case is in the database,
        then constructs the docDefinition constant based on the data in the c object (case),
        then it uses the "pfdmake" library to constryct a pdf file,
        then it converts it to a base64 string and send it to the client.
        RETURNS 404 NOT FOUND: if the ID is not in the database.
                200 OK: if it pereforms the pdf construction.
                400 BAD REQUEST: if an exception is thrown.  
    */
    generatePdf: async function (req, res) {
        try {

            const id = req.params.id
            const c = await Case.findById(id)

            if (!c) {
                return res.status(404).json({ error: 'Cannot find an case with this ID' })
            }
            else {

                const docDefinition = {
                    content: [
                        c.form_type,
                        c.regulated_law,
                        //c.arabic_name,
                        c.english_name,
                        c.city,
                        c.address,
                        c.main_center_phone,
                        c.main_center_fax,
                        c.currency,
                        c.equality_capital,
                        c.fees,
                        c.caseOpenSince,
                        c.caseStatus,
                        c.lawyerStartDate
                    ],

                    defaultStyle: {
                        fontSize: 15,
                        //  bold: true
                    }

                }

                const fontDescriptors = { Roboto: { normal: new Buffer(require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Regular.ttf'], 'base64') } }
                const printer = new pdfMakePrinter(fontDescriptors)
                const doc = printer.createPdfKitDocument(docDefinition)

                let chunks = []

                doc.on('data', (chunk) => {
                    chunks.push(chunk)
                });

                doc.on('end', () => {
                    const result = Buffer.concat(chunks)
                    return res.status(200).json({ data: 'data:application/pdf;base64,' + result.toString('base64') })
                });

                doc.end()
            }


        }
        catch (error) {
            console.log(error)
            return res.status(400).json({ error: 'Error processing query.' })
        }
    }


}

module.exports = InvestorController;
