const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const AdminSchema = new Schema({
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

    Type:{
        type: String,
        default:'Admin'
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
    ssid: {
        type: Number,
    },
    secret: {
        type: String
    },

})

module.exports = Admin = mongoose.model('Admin', AdminSchema)
