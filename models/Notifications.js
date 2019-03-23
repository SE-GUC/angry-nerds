const mongoose = require ('mongoose')


var notificationSchema = new mongoose.Schema({
    receiverInvestor: {
        
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Investor'
        
    },
    receiverStaff: {
        
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Staff'
          
    },
    senderInvestor: {
        
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Investor'
          
    },
    senderStaff: {
        
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Staff'
          
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
