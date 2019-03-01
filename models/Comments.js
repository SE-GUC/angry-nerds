
        const mongoose = require('mongoose')
        const Schema = mongoose.Schema
        
        
        const CommentsSchema = new Schema({
            text: {
                type: String,
                // required: true
            },
            date: {
                type: String,
                // required: true
            },
            Case: {
                type: Number,
                // type: Schema.Types.ObjectId,
                // ref: 'Case',
                // required: true
            },
            Reviewer: {
                type: Number,
                // type: Schema.Types.ObjectId, 
                // ref: 'Staff',
                // required: true
            },
            Lawyer: {
                type: Number,
                // type: Schema.Types.ObjectId, 
                // ref: 'Staff',
                // required: true
            },
            Investor: {
                type: Number,
                // type: Schema.Types.ObjectId, 
                // ref: 'Investor',
                // required: true
            }



        })
        
        module.exports = Commentj = mongoose.model('Comments', CommentsSchema)
        
    

