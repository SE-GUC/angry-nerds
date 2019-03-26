const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Admins = require('../../models/Admin');
const validator = require('../../validations/AdminValidations')

router.get('/', async (req, res) => {
    const Admin = await Admins.find()
    res.json({ data: Admin })
});


router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const Admin = await Admins.findById(id)
        res.json({ data: Admin })
    }
    catch (error) {
        console.log(error)
    }

});

router.post('/', async (req, res) => {
    try {
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const newAdm = await Admins.create(req.body)
        res.json({ msg: 'Admin created successfully', data: newAdm })
    }
    catch (error) {
        console.log(error)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const admin = await Admins.findById(id)
        if (!admin) return res.status(404).send({ error: 'This admin does not exist' });
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const updated = await Admins.findByIdAndUpdate(id, req.body)
        res.json({ msg: 'Admin updated successfully' })
    }
    catch (error) {

        console.log(error)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleted = await Admins.findByIdAndRemove(id)
        res.json({ msg: 'This admin was deleted successfully', data: deleted })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
});
module.exports = router
