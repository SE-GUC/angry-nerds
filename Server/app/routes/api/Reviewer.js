const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Case = require('../../models/Cases')
const hbs = require('hbs')
const Investor = require('../../models/Investor')
const Reviewer = require('../../models/Reviewer')


router.get('/',  async (req, res) => {
    const reviewer = await Reviewer.find()
    res.json({ data: reviewer })
})



router.post('/', async (req, res) => {
    try {
        // const isValidated = validator.createValidation(req.body)
        // if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newReviewer = await Reviewer.create(req.body)
        res.json({ msg: 'reviewer was created successfully', data: newReviewer })
    }
    catch (error) {

        console.log(error)
    }
})

module.exports = router 



