const mongoose = require("mongoose");

const prescriptionSchema = mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Patient ID in prescription is required"],
        ref: "User",
    },
    did: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Doctor ID in prescription is required"],
        ref: "User",
    },
    date: Date,
    basic_checks: [
        {
            check_name: {
                type: String,
                required: [true, "Check name required"],
            },
            check_value: {
                type: String,
                required: [true, "Check value required"],
            },
        },
    ],
    symptoms: [
        {
            symptom: String,
        },
    ],
    diagnosis: [
        {
            name: String,
        },
    ],
    current_conditions: [
        {
            condition: String,
        },
    ],
    medicines: [
        {
            medicine: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Medicine",
            },
            m: {
                is: Boolean,
                food: Boolean,
            },
            a: {
                is: Boolean,
                food: Boolean,
            },
            e: {
                is: Boolean,
                food: Boolean,
            },
            n: {
                is: Boolean,
                food: Boolean,
            },
            quantity: String,
        },
    ],
    tests: [
        {
            remark: String,
        },
    ],
    remarks: [
        {
            remark: String,
        },
    ],
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
