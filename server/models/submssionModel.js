const { Schema, model } = require("mongoose");

const submssionSchema = new Schema({
    studentId: { 
        type: String, 
        required: true 
    },
    groupID:{
        type: String, 
        required: true 
    },
    groupName:{
        type: String, 
        required: true 
    },
    eventId:{
        type: String, 
        required: true 
    },
    eventName:{
        type: String, 
        required: true
    },
    eventType:{
        type: String, 
        required: true
    },
    comments:{
        type: String, 
        required: true 
    },
    url: { 
        type: String, 
        required: true 
    },
   
    isSubmitted:{
        type:Boolean,
        default:null
    }
    // date_ob:{
    //     type:String, 
    //     required: true 
    // }

},
{ timestamps: true }
);
    
const Submssion = model("Submssions", submssionSchema);
    
module.exports = Submssion;