const mongoose = require("mongoose")

const testSchema = mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Patient ID in test is required"],
        ref: "User",
    },
    cid: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Clinical lab ID in test is required"],
        ref: "User",
    },
});