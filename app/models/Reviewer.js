const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const ReviewerSchema = new Schema({
    FName: {
        type: String,
    },
    MName: {
        type: String,
    },

    LName: {
        type: String,
    },

    email: {
        type: String,

    },

    password: {
        type: String,
    },

    gender: {
        type: String,
    },

    Nationality: {
        type: String,
    },

    birthdate:{
        type: Date,
    },

    Address:{
        type: String,
    },

    fax:{
        type: Number,
    },

    telephone_number:{
        type: Number,
    },
    
    completed_number_of_cases:{
        type: Number,
    },
    number_of_cases:{
        type: Number,
    },
    total_time_on_cases:{
        type: Number,
    },

    ssid: {
        type: Number,
    } ,
     //dany
     photoID: {
        type: String
    },
    secret: {
        type: String
    },
    notifications:{
        type : [
            {
                CaseID:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Cases'
                     },
               text: {
                   type: String
               },
               time:{
                   type: Date,
                   default: Date.now
               }
            }
         ]
     }

})

module.exports = Reviewer = mongoose.model('Reviewer', ReviewerSchema)