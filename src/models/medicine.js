const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Medicine name is required"],
    },
    manufacturer: {
        type: String,
        required: [true, "Medicine manufacturer is required"],
    },
    composition: [
        {
            element: {
                type: String,
                required: [true, "Medicine composition's element is required"],
            },
            amount: {
                type: String,
                required: [
                    true,
                    "Medicine composition's element's amount is required",
                ],
            },
        },
    ],
    tabs_per_strip: {
        type: Number,
        required: [true, "Tabs per strip is required"],
    },
    strips_per_packing: {
        type: Number,
        required: [true, "Strips per packing is required"],
        default: 1,
    },
    price_per_strip: {
        type: Number,
        required: [true, "Price per strip is required"],
    },
    price_per_tab: {
        type: Number,
        default: function () {
            return (this.price_per_strip / this.tabs_per_strip).toFixed(3);
        },
    },
    price_per_packing: {
        type: Number,
        default: function () {
            return (this.price_per_packing * this.strips_per_packing).toFixed(
                3
            );
        },
    },
    additional_details: [
        {
            category: String,
            value: String,
        },
    ],
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;