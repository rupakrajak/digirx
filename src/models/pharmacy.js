const mongoose = require("mongoose");

const pharmacySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pharmacy name is required"],
    },
    location: [
        {
            addressline1: {
                type: String,
                required: [
                    true,
                    "Pharmacy's location's address line 1 is required",
                ],
            },
            addressline2: String,
            city_village: {
                type: String,
                required: [
                    true,
                    "Pharmacy's location's city/village is required",
                ],
            },
            district: {
                type: String,
                required: [true, "Pharmacy's location's district is required"],
            },
            pincode: {
                type: Number,
                required: [true, "Pharmacy's location's pincode is required"],
            },
            state: {
                type: String,
                required: [true, "Pharmacy's location's state is required"],
            },
            country: {
                type: String,
                required: [true, "Pharmacy's location's country is required"],
            },
            coords: {
                lat: {
                    type: Number,
                    required: [
                        true,
                        "Pharmacy's location's coordinate's latitude is required",
                    ],
                },
                lng: {
                    type: Number,
                    required: [
                        true,
                        "Pharmacy's location's coordinate's longitude is required",
                    ],
                },
            },
        },
    ],
});

const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);

module.exports = Pharmacy;
