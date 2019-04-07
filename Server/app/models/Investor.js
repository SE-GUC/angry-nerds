const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const uniqueValidator= require ('mongoose-unique-validator')


InvestorSchema = new Schema({

    firstName: {
        type: String,
       // required: true
    },
    MiddleName: {
        type: String,
        //required: true
    },
    LastName: {
        type: String,
        //required: true
    },
    email: {
        type: String,
        lowercase:true,
        //required: true
    },
    password: {
        type: String,
        //required: true
    },
    ID_type: {
        type: String,
        //required: true
    },
    SSID: {
        type: Number,
        //required: true,
        //unique:true
    },
    Nationality:{
        type: String,
        //required: true
    },
    Type:{
        type: String, 
        //required: true
    },
    Address:{
        type: String, 
        //required: true
    },
    birthdate:{
        type: Date, 
        //required: true
    },
    telephone_number:{
        type: Number, 
        //required: true
    },
    gender: {
        type: String
    },
    secretToken: {
        type: String
    },
    active: {
        type: Boolean
    },

    //dany
    photoID: {
        type: String
    },
    notifications:{
        type : [
            {
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

//CaseSchema.plugin(uniqueValidator)
module.exports = Investor = mongoose.model('Investors', InvestorSchema)
