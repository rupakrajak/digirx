const mongoose = require("mongoose");

const clinicalLabSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Clinical lab name is required"],
    },
    location: [
        {
            addressline1: {
                type: String,
                required: [
                    true,
                    "Clinical lab's location's address line 1 is required",
                ],
            },
            addressline2: String,
            city_village: {
                type: String,
                required: [
                    true,
                    "Clinical lab's location's city/village is required",
                ],
            },
            district: {
                type: String,
                required: [
                    true,
                    "Clinical lab's location's district is required",
                ],
            },
            pincode: {
                type: Number,
                required: [
                    true,
                    "Clinical lab's location's pincode is required",
                ],
            },
            state: {
                type: String,
                required: [true, "Clinical lab's location's state is required"],
            },
            country: {
                type: String,
                required: [
                    true,
                    "Clinical lab's location's country is required",
                ],
            },
            coords: {
                lat: {
                    type: Number,
                    required: [
                        true,
                        "Clinical lab's location's coordinate's latitude is required",
                    ],
                },
                lng: {
                    type: Number,
                    required: [
                        true,
                        "Clinical lab's location's coordinate's longitude is required",
                    ],
                },
            },
        },
    ],
    tests: [
        {
            test: String,
        },
    ],
});

const ClinicalLab = mongoose.model("ClinicalLab", clinicalLabSchema);

module.exports = ClinicalLab;
