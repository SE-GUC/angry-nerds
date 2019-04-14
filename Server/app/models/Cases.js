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
    locked: {
        type: Boolean
    },
    //enum:
    /*
        false: Not locked
        true: Locked
    */    
    walk_in: {
        type: Boolean
    },
    //enum:
    /*
        false: Portal
        true: Walk In 
    */    
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
        type: String,
    },
    currency: {
        type: String,
    },
    equality_capital: {
        type: Number,
    },
    pdfString: {
        type: String,
    },
    fees: {
        type: Number,
    },    
    managers: {
        type: [
            {
                name: {
                    type: String,
                },
                inv_type: {
                    type: String,
                },
                gender: {
                    type: String,
                },
                nationallity: {
                    type: String,
                },
                person_id_type: {
                    type: String,
                },
                person_id_number: {
                    type: Number,
                },
                birth_date: {
                    type: Date,
                },
                address: {
                    type: String,
                },
                position: {
                    type: String,
                }
            }
        ],
    } ,

    comment: {
        type : 
            {
                text: {
                    type: Object,
                },
                date: {
                    type: Date,
                },
                Reviewer: {
                    type: Schema.Types.ObjectId, 
                    ref: 'Reviewer',
                },
                Lawyer: {
                    type: Schema.Types.ObjectId, 
                    ref: 'Lawyer',
                },
        },


    },
    
    log: {
        
        type:[ {
            id: {
                type: String
            },
            destination: {
                type: String
            },
            date:{
                type: Date
            }
        } ]

    }

},
{ strict: false })

module.exports = Cases = mongoose.model('Cases', CaseSchema)


