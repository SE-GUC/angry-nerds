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
    //	type: Schema.Types.objectId, ref: "Staff",
    type:String,
        required: true
    },
    lawyerID: {
        //type: Schema.Types.objectId,
        type:String,
       // ref: "Staff",                   
        required: true
    },
    investorID: {
    	type: Schema.Types.objectId,
        ref: "Investor",
        // type:String,
        required: true
    },
    formID: {
    	//type: Schema.Types.objectId,
     //   ref: "Forms",
     type:String,
        required: true
    }

})

module.exports = Case = mongoose.model('Cases', CaseSchema)