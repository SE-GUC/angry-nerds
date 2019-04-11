const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const FormTypeSchema = new Schema( {

    formName:{
        type: String
    },

    format: {
        type: Object
        /**
         * example:
         *  {
         *      "field1":"type1",
         *      "name":"String"
         *  }
         */
    }
} )

module.exports = FormType = mongoose.model('FormTypes', FormTypeSchema)


