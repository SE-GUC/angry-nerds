const mongoose = require ('mongoose')


var notificationSchema = new mongoose.Schema({
    receiverInvestor: {
        
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Investor'
        
    },
    receiverLawyer: {
        
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Lawyer'
          
    },
    receiverReviewer: {
        
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Reviewer'
          
    },
    senderInvestor: {
        
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Investor'
          
    },
    senderLawyer: {
        
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Lawyer'
          
    },
    senderReviewer: {
        
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Reviewer'
          
    },
    text: {
        type: String
    },
    time:{
        type: Date
    },
    importance:{
        type: Number
    },
    case:{
        type: Number
    }
        
}

)


 module.exports = Notification = mongoose.model('Notifications', notificationSchema)      
