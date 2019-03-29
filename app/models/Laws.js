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
        type: number,
    },

    LawCalc: {
        type: number
    },

    min: {
        type: number,
    },

    max : {
        type: number,
    },

    description: {
        type: String,
    }
    
})

module.exports = Laws = mongoose.model('Laws', LawSchema)