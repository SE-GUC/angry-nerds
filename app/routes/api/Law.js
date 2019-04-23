const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Laws = require('../../models/Laws');

router.get('/', async (req, res) => {
    const Law = await Laws.find()
    res.json({ data: Law })
});


router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const Law = await Laws.findById(id)
        res.json({ data: Law })
    }
    catch (error) {
        console.log(error)
    }

});

router.post('/', async (req, res) => {
    try {
        const newAdm = await Laws.create(req.body)
        res.json({ msg: 'Law created successfully', data: newAdm })
    }
    catch (error) {
        console.log(error)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const Law = await Laws.findById(id)
        if (!Law) return res.status(404).send({ error: 'This Law does not exist' });
        const updated = await Laws.findByIdAndUpdate(id, req.body)
        res.json({ msg: 'Law updated successfully' })
    }
    catch (error) {

        console.log(error)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleted = await Laws.findByIdAndRemove(id)
        res.json({ msg: 'This Law was deleted successfully', data: deleted })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
});


module.exports = router
