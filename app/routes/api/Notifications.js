const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Notification = require('../../models/Notifications')
// const validator = require('../../validations/NotificationsValidations')

router.get('/', async (req, res) => {
    const Notifications = await Notification.find()
    res.json({ data: Notifications })
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const Notifications = await Notification.findById(id)
        res.json({ data: Notifications })
    }
    catch (error) {
        console.log(error)
    }
});


// Create a book
router.post('/', async (req, res) => {
    try {
        // const isValidated = validator.createValidation(req.body)
        // if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newNotification = await Notification.create(req.body)
        res.json({ msg: 'Notifications was created successfully', data: newNotification })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
});

// Update a book
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const Notifications = await Notification.findById(id)
        if (!Notifications) return res.status(404).send({ error: 'Notifications does not exist' });
        //  const isValidated = validator.updateValidation(req.body)
        //  if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const updatedNotification = await Notification.updateOne(req.body)
        res.json({ msg: 'Notifications updated successfully', data: updatedNotification })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedNotification = await Notification.findByIdAndRemove(id)
        res.json({ msg: 'Notifications was deleted successfully', data: deletedNotification })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
});



module.exports = router