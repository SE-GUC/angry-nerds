const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const lawyer = require('../../models/Lawyer')





router.get('/', async (req, res) => {
    const lawyers = await Lawyer.find()
    res.json({ data: lawyers })
})
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const lawyers = await Lawyer.findById(id)
    res.json({ data: lawyers })
})

router.post('/', async (req, res) => {
    try {
        // const isValidated = validator.createValidation(req.body)
        // if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newLawyer = await Lawyer.create(req.body)
        res.json({ msg: 'Lawyer was created successfully', data: newLawyer })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const lawyer = await Lawyer.findById(id)
        if (!lawyer) return res.status(404).send({ error: 'Lawyer does not exist' })
        //  const isValidated = validator.updateValidation(req.body)
        //  if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const updatedLawyer = await Lawyer.findByIdAndUpdate(id, req.body)
        res.json({ msg: 'Lawyer updated successfully' })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedLawyer = await Lawyer.findByIdAndRemove(id)
        res.json({ msg: 'Lawyer was deleted successfully', data: deletedLawyer })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})

module.exports = router