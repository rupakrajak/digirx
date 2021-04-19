const mongoose = require("mongoose");

const medicineStockSchema = mongoose.Schema({
    medicine: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Medicine ID is required"],
    },
})