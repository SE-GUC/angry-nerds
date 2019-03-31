const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Case = require('../../models/Cases')
const hbs = require('hbs')
const validator = require('../../../validations/InvestorValidations')
const Investor = require('../../models/Investor')
const request = require('request')
const randomstring = require('randomstring')
const mailer =require ('../../../misc/mailer')
const config = require('../../../config/mailer')

router.get('/',  async (req, res) => {
    const Investors = await  Investor.find()
    res.json({ data: Investors })
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const Investors = await Investor.findById(id)
        res.json({ data: Investors })
    }
    catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newInvestor = await Investor.create(req.body)
        res.json({ msg: 'Investor was created successfully', data: newInvestor })
    }
    catch (error) {
        // We will be handling the error later

        console.log(error)
    }
})

router.post('/register', async (req, res) => {
    console.log(req.body)
    const email = req.body.email
    const user = await Investor.findOne({ email })
    if (user)
        return res.status(400).json({ error: 'Email already exists' })
    else{
        const newInvestor = await Investor.create(req.body)
        res.json({ msg: 'Investor was created successfully', data: newInvestor })
        //.catch(err => res.json('You could not be registered, try again'))
    

    //compose an email
    const html = 'Hi there, <br/> Thank you for registering <br/><br/> Please verify your email by clicking' + tok + ' on the following page:<a href= "http://localhost:3000/api/Investor/verify">http://localhost:3000/api/Investor/verify</a> </br></br> '
    //send the email
    // var FileContent = require("fs").readFileSync('D:/Monica GUC/Sem6 =D/CA/CSEN601 project_28866.pdf')
    // var attachments =  [{
    //      filename : 'CSEN601 project_28866.pdf',
    //      filepath : 'D:/Monica GUC/Sem6 =D/CA',
    //      content :new Buffer(FileContent),
    //      contentType: 'application/pdf'
    // }]
    console.log('before')
    await mailer.sendEmail(config.user, req.body.email, 'Please verify your email', html)
    console.log('after')
    }
})  


router.route('/verify')
.post(async (req,res,next) => {
    try{
        const secretToken = req.body.secretToken

//find the account matching the secret Token 
const inv = await Investor.findOne({ "secretToken": secretToken})
if(!inv) {
    req.flash('error', 'No Investor Found')
    res.redirect('Investor/verify')
    return
}
Investor.active = true
Investor.secretToken = ''
await Investor.save()

req.flash('success', 'Thank you now you may login.')
//re.redirect('/Investor/login')

    } catch(error){
        next(error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)

        const Invstr = await Investor.findById(id)
        if (!Invstr) return res.status(404).send({ error: 'investor does not exist' })
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const updatedInvstr = await Investor.findByIdAndUpdate(id, req.body)
        res.json({ msg: 'Investor updated successfully', data: updatedInvstr })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})



router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedInvestor = await Investor.findByIdAndRemove(id)
        var x=  await deleteCases(id)
        res.json({ msg: 'Investor was deleted successfully' })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})

router.get('/InvViewing/:id', async (req, res) => {
    const idf = '5c77c2b0c5983856f492f33e'
    const Invs = await Investor.findById(idf)
    const stf = await Staff.findById(idf)
    if (stf || Invs)
        var proj = { '_id': 0, 'password': 0 }
    else
        var proj = { '_id': 0, 'firstName': 1, 'MiddleName': 1, 'LastName': 1, 'Nationality': 1, 'Address': 1, 'birthdate': 1, 'telephone_number': 1, 'gender': 1 };

    try {
        const id = req.params.id
        const Invest = await Investor.findById(id, proj)
        res.json({ data: Invest })
    }
    catch (error) {
        console.log(error)
    }
})

router.changePassword = function (id, password) {

    var clientServerOptions = {

        uri: global.heroku + '/api/Investor/' + id,
        body: '{\'password\':' + password + '}',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(clientServerOptions, function (error, response) {

        console.log(error, response)
    });
}



router.viewMyNotifications = function (id) {

    var clientServerOptions = {

        uri: global.heroku + '/api/Notifications',
        body: '',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(clientServerOptions, function (error, response) {

        var data = JSON.parse(response.body).data

        var text = '{ \'data\': ['
        var flag = false
        console.log(data.length)
        for (let i = 0; i < data.length - 1; i++) {
            if (data[i].receiverInvestor === id) {
                text += (JSON.stringify(data[i]) + ',')
                flag = true
            }
        }
        if (data.length > 0) {
            if (data[data.length - 1].receiverInvestor === id) {
                text += (JSON.stringify(data[data.length - 1]))
                text += '] }'
            }
            else {
                console.log('Im here');
                if (flag) {
                    text = text.substring(0, text.length - 1)
                }
                text += '] } '
            }
        }
        var obj = JSON.parse(text)
        console.log(obj)

        return obj;
    });
}


router.viewMyPublishedCompanies = function (id) {

    var clientServerOptions = {

        uri: global.heroku + '/api/Cases',
        body: '',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(clientServerOptions, function (error, response) {

        var data = JSON.parse(response.body).data

        var text = '{ \'data\': ['
        var flag = false
        console.log(data.length)
        for (let i = 0; i < data.length - 1; i++) {
            if (data[i].caseStatus === 'published' && data[i].investorID === id) {
                text += (JSON.stringify(data[i]) + ',')
                flag = true
            }
        }
        if (data.length > 0) {
            if (data[data.length - 1].caseStatus === 'published' && data[data.length - 1].investorID === id) {
                text += (JSON.stringify(data[data.length - 1]))
                text += '] }'
            }
            else {
                console.log('Im here');
                if (flag) {
                    text = text.substring(0, text.length - 1)
                }
                text += '] } '
            }
        }
        var obj = JSON.parse(text);
        console.log(obj)

        return obj;
    });
}

router.viewMyPendingCompanies = function (id) {

    var clientServerOptions = {

        uri: global.heroku + '/api/Cases',
        body: '',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(clientServerOptions, function (error, response) {

        console.log(error, response)
        var data = JSON.parse(response.body).data

        var text = '{ \'data\': ['
        var flag = false
        console.log(data.length)
        for (let i = 0; i < data.length - 1; i++) {
            if (data[i].caseStatus != 'published' && data[i].investorID === id) {
                text += (JSON.stringify(data[i]) + ',')
                flag = true
            }
        }
        if (data.length > 0) {
            if (data[data.length - 1].caseStatus != 'published' && data[data.length - 1].investorID === id) {
                text += (JSON.stringify(data[data.length - 1]))
                text += '] }'
            }
            else {
                console.log('Im here');
                if (flag) {
                    text = text.substring(0, text.length - 1)
                }
                text += '] } '
            }
        }
        //console.log(text)
        var obj = JSON.parse(text);
        console.log(obj)
        return obj;
    });
}

module.exports = router 


/* This function deletes cases after deleting investor and the case status is not published
    takes Investor*/


deleteCases = async function(InvId)
{
    const query = { investorID: InvId }
    const deletedCases = await Case.find(query)
    for (let i = 0; i < deletedCases.length; i += 1) {
        if (deletedCases[i].caseStatus !== 'published') {
            await Case.findByIdAndRemove(deletedCases[i]._id) 
            
        }
  } 
}
