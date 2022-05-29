const { Schema, model } = require("mongoose");

const markingSchema = new Schema({
    submissionTypeId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    markingSchema: [
        {
            criteria: String,
            marks: Number,
        },
    ],

},
    { timestamps: true }
);

const MarkingSchema = model("MarkingSchema", markingSchema);

module.exports = MarkingSchema;