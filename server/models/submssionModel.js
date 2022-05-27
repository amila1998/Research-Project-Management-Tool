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
    comments:{
        type: String, 
        required: true 
    },
    url: { 
        type: String, 
        required: true 
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