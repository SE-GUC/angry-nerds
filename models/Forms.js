const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const formSchema = new Schema(
//SSC form
{ 
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
        required: false
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
    address: {
        type: String, 
        required: false
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
        min: 50000
    },
    inv_name: {
        type: String,
        required: false
    },
    inv_type: {
        type: String,
        required: false
    },
    inv_gender: {
        type: String,
        required: false
    },
    inv_nationallity: {
        type: String,
        required: false
    },
    inv_person_id_type: {
        type: String,
        required: false
    },
    inv_person_id_number: {
        type: Number,
        required: false
    },
    inv_birth_date: {
        type: Date,
        required: false
    },
    inv_adrdess: {
        type: String,
        required: false
    },
    inv_phone: {
        type: String,
        required: false
    },
    inv_fax: {
        type: Number,
        required: false
    },
    inv_mail: {
        type: String,
        required: false
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
                    required: false
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
},
//SPC form
{
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
    ar_organization_name: {
        type:String,
        required: false
    },
    en_organization_name: {
        type:String,
        required: false
    },
    arabic_name: {
        type: String,
        required: false
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
    address: {
        type: String, 
        required: false
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
        min: 50000
    },
    inv_name: {
        type: String,
        required: false
    },
    inv_type: {
        type: String,
        required: false
    },
    inv_gender: {
        type: String,
        required: false
    },
    inv_nationallity: {
        type: String,
        required: false
    },
    inv_person_id_type: {
        type: String,
        required: false
    },
    inv_person_id_number: {
        type: Number,
        required: false
    },
    inv_birth_date: {
        type: Date,
        required: false
    },
    inv_adrdess: {
        type: String,
        required: false
    },
    inv_phone: {
        type: String,
        required: false
    },
    inv_fax: {
        type: Number,
        required: false
    },
    inv_mail: {
        type: String,
        required: false
    }
}
)




module.exports = Forms = mongoose.model('Forms', formSchema)