const MarkingSchema = require("../models/markingSchemaModel");
const SubmissionType = require("../models/submissionType");

const markingSchemaController = {
    addSchema: async (req, res) => {
        try {
            const { submissionTypeId, title, markingSchema } = req.body;
            if (!title || !submissionTypeId || !markingSchema) {
                return res.status(400).json({ message: "Please fill in all fields." });
            }
            const exitMarkingSchema = await MarkingSchema.findOne({ title });
            if (exitMarkingSchema) {
                return res.status(400).json({ message: title + " already taken." });

            }
            const newMarkingSchema = new MarkingSchema({
                submissionTypeId, title, markingSchema
            })
            await newMarkingSchema.save();
            res.status(200).json({
                msg: "Marking Schema Added Successfully ;)",
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
            const markingSchema = await MarkingSchema.find();
            res.status(200).json({
                markingSchema,
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
            const markingSchema = await MarkingSchema.findOne({submissionTypeId:req.params.id});
            try {
                const submissionData = await SubmissionType.findById(markingSchema.submissionTypeId);
                res.status(200).json({
                    submissionData,
                    markingSchema,
                    success: true
                })
            } catch (error) {
                res.status(500).json({
                    msg: error.message,
                    success: false
                });
            }
            // res.status(200).json({
            //     markingSchema,
            //     success: true
            // })
        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    },
    updateSchema: async (req, res) => {
        try {
            const { submissionTypeId, title, markingSchema } = req.body;
            if (!title || !submissionTypeId || !markingSchema) {
                return res.status(400).json({ message: "Please fill in all fields." });
            }

            await MarkingSchema.findByIdAndUpdate({ _id: req.params.id }, {
                submissionTypeId, title, markingSchema
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
    deleteSchema: async (req, res) => {
        try {
            await MarkingSchema.findOneAndDelete(req.params.id)
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

module.exports = markingSchemaController;