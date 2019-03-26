const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const ReviewerSchema = new Schema({
    FName: {
        type: String,
        required: true
    },
    MName: {
        type: String,
        required: true
    },

    LName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    Nationality: {
        type: String,
        required: true
    },

    birthdate:{
        type: Date,
        required: true
    },

    Address:{
        type: String,
        required: true
    },


    fax:{
        type: Number,
        required: true
    },

    telephone_number:{
        type: Number,
        required: true
    },
    
    total_number_of_cases: {
        type: Number,
        required: true
    },
    completed_number_of_cases:{
        type: Number,
        required: true
    },
    number_of_cases:{
        type: Number,
        required: true
    },
    total_time_on_cases:{
        type: Number,
        required: true
    },

    ssid: {
        type: Number,
        required: true
    },

    ratings: {
        type : [{
            investorID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Investor',
            },
            CaseID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Cases',
            },
            rating: {
                type: Number
            },
            Comment:{
                type: String
            } 

        }]
    }
        
    


})

module.exports = Reviewer = mongoose.model('Reviewer', ReviewerSchema)