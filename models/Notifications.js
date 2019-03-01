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


 module.exports = Notification = mongoose.model('Notifications', notificationSchema)      
