const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const projection = { _id: 0, question: 1, answer: 1, time: 1 }
const Questions = require('../../models/Questions');
const validator = require('../../../validations/QuestionsValidations')

router.get('/', async (req, res) => {
    const ques = await Questions.find()
    res.json({ data: ques })
});

router.get('/UnregisteredViewQuestions', async (req, res, next) => {
    try {
        const ques = await Questions.find({}, projection)
        res.json({ data: ques })
    } catch (err) {
        return next(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const ques = await Questions.findById(id)
        res.json({ data: ques })
    }
    catch (error) {
        console.log(error)
    }

});

router.post('/', async (req, res) => {
    try {
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const newQues = await Questions.create(req.body)
        res.json({ msg: 'Question created successfully', data: newQues })
    }
    catch (error) {
        console.log(error)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const ques = await Questions.findById(id)
        if (!ques) return res.status(404).send({ error: 'This question does not exist' });
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const updatedques = await Questions.findByIdAndUpdate(id, req.body)
        res.json({ msg: 'Question updated successfully' })
    }
    catch (error) {

        console.log(error)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedques = await Questions.findByIdAndRemove(id)
        res.json({ msg: 'This question was deleted successfully', data: deletedques })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
});



module.exports = router
