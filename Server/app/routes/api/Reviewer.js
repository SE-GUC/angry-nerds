const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Reviewer = require('../../models/Reviewer');

router.get('/', async (req, res) => {
    const rev = await Reviewer.find()
    res.json({ data: rev })
});
;

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const rev = await Reviewer.findById(id)
        res.json({ data: rev })
    }
    catch (error) {
        console.log(error)
    }

});

router.post('/', async (req, res) => {
    try {
        //const isValidated = validator.createValidation(req.body)
     //   if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const newRev = await Reviewer.create(req.body)
        res.json({ msg: 'Reviewer created successfully', data: newRev })
    }
    catch (error) {
        console.log(error)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const rev = await Reviewer.findById(id)
        if (!rev) return res.status(404).send({ error: 'This Reviewer does not exist' });
        //const isValidated = validator.updateValidation(req.body)
       // if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const updated = await Reviewer.findByIdAndUpdate(id, req.body)
        res.json({ msg: 'Reviewer updated successfully' })
    }
    catch (error) {

        console.log(error)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleted = await Reviewer.findByIdAndRemove(id)
        res.json({ msg: 'This Reviewer was deleted successfully', data: deleted })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
});



module.exports = router
