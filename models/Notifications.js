const mongoose = require ('mongoose')


var notificationSchema = new mongoose.Schema({
    reciver: {
        type: String

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

// mongoose.model('notification',notificationSchema );   // we call notificationSchema when we want to inseet data
                                                      // notification is the collection

 module.exports = Notification = mongoose.model('Notifications', notificationSchema)       //// TUT5