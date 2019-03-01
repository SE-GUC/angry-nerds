const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const BoardSchema = new Schema({
    companyID: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    nationality: {
        type: String, 
        required: true
    },
    gender:{
        type: String, 
        required: true
    },
    birthdate:{
        type: Number, 
        required: true
    },
    ssid:{
        type: Number, 
        required: true
    },
    idType:{
        type: String, 
        required: true
    },
    investorType:{
        type: String, 
        required: true
    },
    address:{
        type: String, 
        required: true
    },
    position:{
        type: String, 
        required: true
    }
})

module.exports = Board = mongoose.model('BoardOfDirectors', BoardSchema)