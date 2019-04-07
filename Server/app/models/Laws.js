const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const LawSchema = new Schema({

    LawNumber: {
        type: String,
    },

    LawEntity: {
        type: String,
    },

    LawValue: {
        type: Number,
    },

    LawCalc: {
        type: Number
    },

    min: {
        type: Number,
    },

    max: {
        type: Number,
    },

    description: {
        type: String,
    }
    
})

module.exports = Laws = mongoose.model('Laws', LawSchema)