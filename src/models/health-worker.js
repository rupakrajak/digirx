const mongoose = require("mongoose");

const healthWorkerSchema = mongoose.Schema({
    title: String,
    degrees: [
        {
            degree: {
                name: {
                    type: String,
                    required: [true, "Degree name is required"],
                },
                abbreviation: {
                    type: String,
                    required: [true, "Degree abbreviation is required"], 
                }
            },
        },
    ],
    specializations: [
        {
            name: String,
        }
    ],
    work_at: {
        type: mongoose.Schema.Types.ObjectId,
    },
    daily_patient_limit: {
        type: Number,
        required: [true, "Daily patient limit is required"],
    }
});

const HealthWorker = mongoose.model("HealthWorker", healthWorkerSchema);

module.exports = HealthWorker;
