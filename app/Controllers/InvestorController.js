const validator = require('../../validations/caseValidations')
const stripe = require('stripe')('sk_test_Tc2FlJG0ovXrM6Zt7zuK1O6f002jC3hcT0')
const Case = require('./../models/Cases')
const Investor = require('./../models/Investor')
const AdminController = require('./AdminController')
const Notification = require('./../models/Notifications')
const Admins = require('./../models/Admin')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const pdfMakePrinter = require('pdfmake/src/printer')
const Reviewer = require('./../models/Reviewer')
const Lawyer = require('./../models/Lawyer')



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
        const inv = await Case.findOne({ _id: myCase.investorID })
        const userEmail = inv.email
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
                if (err) return res.json({ message: 'card declined' })
                else {
                    //console.log(token)
                    var chargeAmount = AdminController.SystemCalcFees(CaseID)
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
                            let transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'angry.nerds2019@gmail.com',
                                    pass: 'Angry1234'
                                }
                 
                            });
                            let mailOptions = {
                                from: '"Angry Nerds 👻" <angry.nerds2019@gmail.com>', // sender address
                                to: userEmail, // list of receivers
                                subject: 'Invoice', // Subject line
                                text: 'you now have a company', // plain text body
                                html: '<h3>The code expires within an hour</h3> '
                                // html body
                            };
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                                res.json({ success: true, message: 'An email has been sent check your email' });
                            });
                            return res.json({ message: 'your payment has been made; you will receive an invoice via your mail' })
                        }

                    })

                }

            })

        }
        else
            return res.json({ message: 'you cannot pay for a company that is not yours' })

        //console.log(req.body)

    },

    InvestorViewFees: async function (req, res) {
        try {
            
            const id = req.params.id
            const projection = { _id: 0, Fees: 1}
            const Cases = await Case.findById(id,projection)
            if (!Cases) {
                res.json({ msg: 'Can not find company' })
            }
            else {
                console.log(Cases)
                res.json({ data: Cases , msg:'This is your fees' })
            }
        }
        catch {
            res.json({msg: 'Cannot find company'})
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


    investorUpdateForm: async (req,res) => {
        try {
            const id=req.params.id
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
                return res.status(200).json({ msg: 'Done' , data: notifications })
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
                return res.status(200).json({ msg:'Done',data: cases })
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
                return res.status(200).json({ msg: 'Done', data: cases })
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


                doc.on('end', async () => {
                    const result = Buffer.concat(chunks)
                    await Case.findByIdAndUpdate(id,{ pdfString: result.toString('base64') })
                    return res.status(200).json({ msg: 'Done' , data: 'data:application/pdf;base64,' + result.toString('base64') })
                });

                doc.end()
            }


        }
        catch (error) {
            console.log(error)
            return res.status(400).json({ error: 'Error processing query.' })
        }
    },


    InvCompListViewing: async (res) => {

        try {
            var Cas = await Case.find({ caseStatus: 'published' }, projx)
    
            for (var i = 0; i < Cas.length; i++) {
             var projx = { '_id': 0, 'reviewerID': 0, 'lawyerID': 0, 'investorID': 0 ,  'equality_capital': 0, 'currency': 0, 'fees':0}
            }
             Cas = await Case.find({ caseStatus: 'published' }, projx)
             res.json({ data: Cas })
         }
         catch (error) {
            console.log(error)
        }
    },

    InvCompViewing: async (req, res)=> {

        const id = req.params.id
        var Cas = await Case.findById(id)
        
        try {
            if (Cas.caseStatus === 'published') {
                var proj1 = {  '_id': 0, 'reviewerID': 0, 'lawyerID': 0, 'investorID': 0 ,  'equality_capital': 0, 'currency': 0, 'fees':0}
                Cas = await Case.findById(id, proj1)
                res.json({ data: Cas }) 
            } else {
                res.json({ msg: 'Case was not published' })
    
            }
        }
        catch (error) {
            console.log(error)
        }
    },
    
    InvViewing: async (req, res)=> {
        
    var proj = { '_id': 0, 'password': 0}
    var projy = {'_id': 0, 'password': 0 , 'ratings': 0}
    try {
        const id = req.params.id
        const Inv = await Investor.findById(id, proj)
        const Revs = await Reviewer.findById(id, proj)
        const Adm = await Admins.findById(id,proj)
        const Lawy = await Lawyer.findById(id, projy)
        if(Inv)
        res.json({ message:'investor' ,data: Inv})
        else if(Revs)
        res.json({message: 'Rev' ,data: Revs})
        else if(Lawy)
        res.json({message: 'lawyer',data: Lawy})
        else if(Adm)
        res.json({message: 'Admin',data: Adm})
        else {
            res.json({message: 'User does not exist'})

        }
    }
    catch (error) {
    console.log(error)
}
    },
    InvestorRateLawyer: async function (req, res) {
        const id = req.params.id // Lawyer ID
        const invID = '5c77c2b0c5973856f492f33e' //get this from login token
        const CasID = '5c94dfa63c95ff18c8866d56' //get this from frontend 
        const Ratin = req.body.rating
        const Comm = req.body.Comment
        const aCase = await Case.findById(CasID)
        const Lawy = await Lawyer.findById(id)
       
        try{
            
            if(!aCase)
            res.json({msg: 'this case does not exist'})
            if(!Lawy)  {
            res.json({msg: 'not a lawyer, try again'})}
            
            if(aCase.investorID == invID&&aCase.lawyerID == id){
                var newrate = [{'investorID': invID, 'CaseID':CasID, 'rating': Ratin , 'Comment': Comm}]
                console.log(newrate)
                const updat = await Lawyer.findOneAndUpdate(id, {$push: {ratings: newrate}})
                res.json({msg: 'Rating placed', Data: updat })
            }else{
                res.json({msg: 'you are trying to access a case that is not yours or has a lawyer who did not work with you'})
            }
            
        }
        
        
        
        catch (error) {
            console.log(error)
        }
    },
    
    uploadFile: (req, res, next) => {
        const file = req.file
        if (!file) {
          const error = new Error('Please upload a file')
          error.httpStatusCode = 400
          return next(error)
        }
          res.send(file)
        
      }


}

module.exports = InvestorController;
