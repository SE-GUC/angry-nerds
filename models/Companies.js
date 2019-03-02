const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const CompaniesSchema = new Schema({
    arabic_name: {
        type: String,
        required: true
    },
    english_name: {
        type: String,
        required: false
    },
    hq_adress: {
        type: String,
        required: true
    },
    hq_city: {
        type: String, 
        required: true
    },
    hq_state: {
        type: String, 
        required: true
    },
    fax: {
        type: String,
        required: false
    },
    telephone: {
        type: String, 
        required: false
    },
    capital: {
        type: Number, 
        required: true
    },
    currency: {
        type: String, 
        required: true
    },
    type: {
        type: String, 
        required: true
    },
    investor_id: {
        type: String,
        required: true
    },
})

module.exports = Company = mongoose.model('Companies', CompaniesSchema)
