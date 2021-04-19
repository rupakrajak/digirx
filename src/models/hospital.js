const mongoose = require("mongoose");

const hospitalSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Hospital name is required"],
    },
    location: [
        {
            addressline1: {
                type: String,
                required: [
                    true,
                    "Hospital's location's address line 1 is required",
                ],
            },
            addressline2: String,
            city_village: {
                type: String,
                required: [
                    true,
                    "Hospital's location's city/village is required",
                ],
            },
            district: {
                type: String,
                required: [true, "Hospital's location's district is required"],
            },
            pincode: {
                type: Number,
                required: [true, "Hospital's location's pincode is required"],
            },
            state: {
                type: String,
                required: [true, "Hospital's location's state is required"],
            },
            country: {
                type: String,
                required: [true, "Hospital's location's country is required"],
            },
            coords: {
                lat: {
                    type: Number,
                    required: [
                        true,
                        "Hospital's location's coordinate's latitude is required",
                    ],
                },
                lng: {
                    type: Number,
                    required: [
                        true,
                        "Hospital's location's coordinate's longitude is required",
                    ],
                },
            },
        },
    ],
    services_available: [
        {
            service: String,
        },
    ],
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
