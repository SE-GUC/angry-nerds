const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const CaseSchema = new Schema({
    
    caseStatus: {
        type: String,
        required: true
    },
    
    caseOpenSince: {
        type: Date,
        required: true
    },

    caseClosedDate:{
        type: Date,
        required: true
    },
    reviewerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
    },
    lawyerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',                   
    },
    investorID: {
    	type: mongoose.Schema.Types.ObjectId,
        ref: 'Investor',
        required: true
    },

    form_type :{
        type: String,
        required:false
    },
    regulated_law: {
        type: String,
        required: false
    },
    legal_form: {
        type: String,
        required: false
    },
    arabic_name: {
        type: String,
        required: true
    },
    english_name: {
        type: String, 
        required: false
    },
    government: {
        type: String, 
        required: false
    },
    city: {
        type: String, 
        required: false
    },
    hq_address: {
        type: String
    },
    hq_city: {
        type: String
    },
    hq_state: {
        type: String
    },
    main_center_phone: {
        type: Number, 
        required: false
    },
    main_center_fax: {
        type: Number,
        required: false
    },
    currency: {
        type: String,
        required: false
    },
    equality_capital: {
        type: Number,
        required: false,
       
    },
    
    managers: {
        type: [
            {
                name: {
                    type: String,
                    required: false
                },
                inv_type: {
                    type: String,
                    required: false
                },
                gender: {
                    type: String,
                    required: false
                },
                nationallity: {
                    type: String,
                    required: false
                },
                person_id_type: {
                    type: String,
                    required: false
                },
                person_id_number: {
                    type: Number,
                    required: false,
                },
                birth_date: {
                    type: Date,
                    required: false
                },
                address: {
                    type: String,
                    required: false
                },
                position: {
                    type: String,
                    required: false
                }
            }
        ],
        required: false
    }


})

module.exports = Cases = mongoose.model('Cases', CaseSchema)

