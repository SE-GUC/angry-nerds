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
        type: Schema.Types.ObjectId,
        ref: "Staff",
        required: true
    },
    lawyerID: {
        type: Schema.Types.ObjectId,
        ref: "Staff",                   
        required: true
    },
    investorID: {
    	type: Schema.Types.ObjectId,
        ref: "Staff",
        required: true
    },
   // formID: {
    //	type: Schema.Types.objectId,
      //  ref: "Forms",
        //required: true
    //}

})

module.exports = Cases = mongoose.model('Cases', CaseSchema)