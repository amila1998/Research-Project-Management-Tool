const Evaluation = require("../models/evaluationsModel");

const evaluationController = {
    addEvaluation: async (req, res) => {
        try {
            const { submissionTypeId, groupId, evaluatorId, marks, level, isBlindReviewed, result } = req.body;
            if (!groupId || !submissionTypeId || !evaluatorId || !marks || !result) {
                return res.status(400).json({ message: "Please fill in all fields." });
            }
            const exitEvaluation = await Evaluation.findOne({ groupId: groupId, submissionTypeId: submissionTypeId });
            if (exitEvaluation) {
                return res.status(400).json({ message: title + " already evaluated." });

            }
            const newEvaluation = new Evaluation({
                submissionTypeId, groupId, evaluatorId, marks, level, isBlindReviewed, result
            })
            await newEvaluation.save();
            res.status(200).json({
                msg: "Evaluation Added Successfully ;)",
                success: true
            })

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    },

    getAll: async (req, res) => {
        try {
            const evaluations = await Evaluation.find();
            res.status(200).json({
                evaluations,
                success: true
            })

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    },

    getOne: async (req, res) => {
        try {
            const evaluation = await Evaluation.findById({ _id: req.params.id });
            res.status(200).json({
                evaluation,
                success: true
            })

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    },

    checkAndGetOne: async (req, res) => {
        try {
            const { submissionTypeId } = req.body;
            const evaluation = await Evaluation.findById({ _id: req.params.id });
            res.status(200).json({
                evaluation,
                success: true
            })

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    },

    getLevel: async (req, res) => {
        try {
            const { submissionTypeId, groupId } = req.body;
            const evaluation = await Evaluation.findOne({ groupId: groupId ,submissionTypeId: submissionTypeId });
            res.status(200).json({
                evaluation,
                success: true
            })

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    },

    updateEvaluation: async (req, res) => {
        try {
            const { submissionTypeId, groupId, evaluatorId, marks, level, isBlindReviewed, result } = req.body;
            if (!groupId || !submissionTypeId || !evaluatorId || !marks || !result) {
                return res.status(400).json({ message: "Please fill in all fields." });
            }

            await Evaluation.findByIdAndUpdate({ _id: req.params.id }, {
                submissionTypeId, groupId, evaluatorId, marks, level, isBlindReviewed, result
            })
            res.status(200).json({
                msg: "Update Successful !",
                success: true
            })

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }

    },

    deleteEvaluation: async (req, res) => {
        try {
            await Evaluation.findOneAndDelete(req.params.id)
            res.status(200).json({
                msg: "Delete Successful !",
                success: true
            })

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    }
}

module.exports = evaluationController;