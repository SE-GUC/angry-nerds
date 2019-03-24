const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const CaseSchema = new Schema({
    
    caseStatus: {
        type: String,
    },
    //enum:
    /*
        investor: Only when the lawyer rejected and returned the form o the investor
        lawyer-investor: At the lawyer coming from the investor
        lawyer-reviewer At the lawyer coming from the reviewer
        reviewer
        pending: Reviewer approved, waiting payment
        published
     */
    caseOpenSince: {
        type: Date,
    },
    //set when creating the form
    caseClosedDate:{
        type: Date,
    },
    //set when paying the fees
    lawyerStartDate:{
        type: Date,
    },
    //set whenever the case is returned to the lawyer
    reviewerStartDate:{
        type: Date,
    },
    //set whenever the case is returned to the reviewer

    lawyerTotalTime:{
        type: Number,  //in mins
    },
    //Updated when the case leaves lawyer (approve or reject)
    reviewerStartDate:{
        type: Number, //in mins
    },
    //Updated when the case leaves reviewer (approve or reject)
    reviewerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviewer',
    },
    lawyerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lawyer',                   
    },
    investorID: {
    	type: mongoose.Schema.Types.ObjectId,
        ref: 'Investor',
    },
    form_type :{
        type: String,
    },
    //enum:
    /*
        SSC
        SPC
    */ 
    regulated_law: {
        type: String,
    },
    //enum:
    /*
        159
        72
     */
    legal_form: {
        type: String,
        required: false
    },
    //?????
    arabic_name: {
        type: String,
    },
    english_name: {
        type: String, 
    },
    governorate: {
        type: String, 
    },
    city: {
        type: String, 
    },
    address: {
        type: String
    },
    main_center_phone: {
        type: Number, 
    },
    main_center_fax: {
        type: Number,
    },
    currency: {
        type: String,
        required: false
    },
    equality_capital: {
        type: Number,
    },
    fees: {
        type: Number,
    },
    //ask fady
    
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
    } ,

    comment: {
        type : [
            {

                text: {
                    type: String,
                    required: true
                },
                date: {
                    type: String,
                    required: true
                },
                Case: {
                    // type: String,
                    type: Schema.Types.ObjectId,
                    ref: 'Cases',
                    required: true
                },
                Reviewer: {
                    // type: String,
                    type: Schema.Types.ObjectId, 
                    ref: 'Staff',
                    required: true
                },
                Lawyer: {
                    // type: String ,
                    type: Schema.Types.ObjectId, 
                    ref: 'Staff',
                    required: true
                },
                Investor: {
                    // type: String,
                    type: Schema.Types.ObjectId, 
                    ref: 'Investor',
                    required: true


            }
        }
        ],
        required: false


    } 

})


module.exports = Cases = mongoose.model('Cases', CaseSchema)


