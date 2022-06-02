const { Schema, model } = require("mongoose");

const evaluationSchema = new Schema({
    submissionTypeId: {
        type: String,
        required: true
    },
    groupId: {
        type: String,
        required: true
    },
    evaluatorId: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        default: 0
    },
    isBlindReviewed: {
        type: Boolean,
        default: false
    },
    result: [
        {
            criteria: String,
            comment: String,
            marks: Number,
        },
    ],

},
    { timestamps: true }
);

const Evaluation = model("Evaluations", evaluationSchema);

module.exports = Evaluation;