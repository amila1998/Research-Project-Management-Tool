const { Schema, model } = require("mongoose");

const topicsEvaluvationPanalsSchema = new Schema({
    user_id:{
        type:String,
        required:true
    }

},{
    timestamps:true
})
















const TopicsEvaluvationPanal = model("TopicsEvaluvationPanals", topicsEvaluvationPanalsSchema);
    
module.exports = TopicsEvaluvationPanal;