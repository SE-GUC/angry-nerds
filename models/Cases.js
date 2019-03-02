const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const CaseSchema = new Schema({
    
    caseStatus: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyType: {
        type: String,
        required: true
    },
    caseOpenSince: {
        type: Date,
        required: true
    },
    reviewerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true
    },
    lawyerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',                   
        required: true
    },
    investorID: {
    	type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true
    },
    formID: {
    	type: mongoose.Schema.Types.ObjectId,
        ref: 'Forms',
        required: true
    }

})

module.exports = Cases = mongoose.model('Cases', CaseSchema)