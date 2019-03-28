const mongoose= require ('mongoose')
const Schema= mongoose.Schema
//_id: mongoose.Schema.Types.ObjectId

const QuestionsSchema = new Schema( {
   // _id: mongoose.Types.ObjectId,

    senderID:{
        type: Schema.Types.ObjectId, ref: 'Investor',
       // type:Number,
       // require: false
    },
    
    AdminID: {
        type: Schema.Types.ObjectId, ref: 'Admin',
        //type:Number,
        require: true 
    },
    question : {
        type: String,
        require:true
    },

    answer :{
        type:String,
        require:true
    },
    time :{
        type:Date,
        require:true
        } 
    })
module.exports= Questions=mongoose.model('Questions',QuestionsSchema)



