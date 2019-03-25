const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const AdminSchema = new Schema({
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

    Type:{
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
    }
})

module.exports = Admin = mongoose.model('Admin', AdminSchema)
