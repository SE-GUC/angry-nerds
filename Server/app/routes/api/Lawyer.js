const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Case = require('../../models/Cases')
const hbs = require('hbs')
const Investor = require('../../models/Investor')
const Lawyer = require('../../models/Lawyer')


router.get('/',  async (req, res) => {
    const l = await Lawyer.find()
    res.json({ data: l })
})



router.post('/', async (req, res) => {
    try {
        // const isValidated = validator.createValidation(req.body)
        // if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newLawyer = await Lawyer.create(req.body)
        res.json({ msg: 'Lawyer was created successfully', data: newLawyer })
    }
    catch (error) {

        console.log(error)
    }
})

module.exports = router 



