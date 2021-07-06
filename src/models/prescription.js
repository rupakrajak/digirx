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
    // basic_checks: [
    //     {
    //         check_name: 
    //             String,
    //             // required: [true, "Check name required"],
            
    //         check_value:
    //             String,
    //             // required: [true, "Check value required"],
         
    //     },
    // ],
    basic_checks:[{}],
    symptoms: [String],
    diagnosis: [String],
    current_conditions: [String],
    // medicines: [
    //     {
    //         medicine: 
    //             // type: mongoose.Schema.Types.ObjectId,
    //             String,
    //             // required: true,
    //             // ref: "Medicine",
            
    //         m: {
    //             is: Boolean,
    //             food: Boolean,
    //         },
    //         a: {
    //             is: Boolean,
    //             food: Boolean,
    //         },
    //         e: {
    //             is: Boolean,
    //             food: Boolean,
    //         },
    //         n: {
    //             is: Boolean,
    //             food: Boolean,
    //         },
    //         quantity: String,
    //     },
    // ],
    medicines: [{}],
    tests: [String],
    remarks: [String],
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
