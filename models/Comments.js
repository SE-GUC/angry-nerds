
        const mongoose = require('mongoose')
        const Schema = mongoose.Schema
        
        
        const CommentsSchema = new Schema({
            // Comments_ID: {
            //     type: String
            //     // required: true
            // },
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



        })
        
        module.exports = Commentj = mongoose.model('Comments', CommentsSchema)
        
    

