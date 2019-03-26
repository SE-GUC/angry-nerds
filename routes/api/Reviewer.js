const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const reviewer = require('../../models/Reviewer')


//CRUDS
router.get('/', async (req, res) => {
    const staffi = await Reviewer.find()
    res.json({ data: staffi })
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const staffi = await Reviewer.findById(id)
    res.json({ data: staffi })
})

router.post('/', async (req, res) => {
    try {
        // const isValidated = validator.createValidation(req.body)
        // if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const Reviewer = await Reviewer.create(req.body)
        res.json({ msg: 'Reviewer was created successfully', data: newStaff })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedStaff = await Reviewer.findByIdAndRemove(id)
        res.json({ msg: 'Staff was deleted successfully', data: deletedStaff })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const staff = await Reviewer.findById(id)
        if (!staff) return res.status(404).send({ error: 'Staff does not exist' })
        const updatedStaff = await Reviewer.findByIdAndUpdate(id, req.body)
        res.json({ msg: 'Reviewer updated successfully' })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})



module.exports = router