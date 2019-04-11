const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Lawyer = require('../../models/Lawyer');

router.get('/', async (req, res) => {
    const allLawyers = await Lawyer.find()
    res.json({ data: allLawyers })
});
;

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const newLawyer = await Lawyer.findById(id)
        res.json({ data: newLawyer })
    }
    catch (error) {
        console.log(error)
    }

});

router.post('/', async (req, res) => {
    try {
        //const isValidated = validator.createValidation(req.body)
     //   if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const newLawyer = await Lawyer.create(req.body)
        res.json({ msg: 'Lawyer created successfully', data: newLawyer })
    }
    catch (error) {
        console.log(error)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const newLawyer = await Lawyer.findById(id)
        if (!newLawyer) return res.status(404).send({ error: 'This Lawyer does not exist' });
        //const isValidated = validator.updateValidation(req.body)
       // if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const updated = await Lawyer.findByIdAndUpdate(id, req.body)
        res.json({ msg: 'Lawyer updated successfully' })
    }
    catch (error) {

        console.log(error)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleted = await Lawyer.findByIdAndRemove(id)
        res.json({ msg: 'This Lawyer was deleted successfully', data: deleted })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
});



<<<<<<< HEAD
module.exports = router
=======
module.exports = router
>>>>>>> Dev
