const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const FormTypeSchema = new Schema( {

    formName:{
        type: String
    },

    model: {
        type: Object
        /**
         * example:
         *  {
         *      "field1":"type1",
         *      "name":"String"
         *  }
         */
    }
},
{ strict: false } )

module.exports = FormType = mongoose.model('FormTypes', FormTypeSchema)


