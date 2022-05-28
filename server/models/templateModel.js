const { Schema, model } = require("mongoose");

const templateSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    filename:{
        type: String, 
        required: true 
    },
    url: { 
        type: String, 
        required: true 
    },
    description:{
        type: String, 
        required: true 
    }

},
{ timestamps: true }
);
    
const Template = model("Templates", templateSchema);
    
module.exports = Template;