const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        firstname: {
            type: String,
            required: [true, "First name is required"],
        },
        middlename: {
            type: String,
            required: [true, "Middle name is required"],
        },
        lastname: {
            type: String,
            required: [true, "Last name is required"],
        },
    },
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: [true, "Email address already in use"],
        lowercase: true,
    },
    mobile: {
        type: Number,
        required: [true, "Mobile number is required"],
        unique: [true, "Mobile number already in use"],
    },
    dob: {
        type: Date,
        required: [true, "DOB is required"],
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
    },
    bloodgrp: {
        type: String,
        enum: ["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"],
    },
    residence: {
        addressline1: {
            type: String,
            required: [true, "Address line 1 is required"],
        },
        addressline2: String,
        city_village: {
            type: String,
            required: [true, "City/village is required"],
        },
        district: {
            type: String,
            required: [true, "District is required"],
        },
        pincode: {
            type: Number,
            required: [true, "Pincode is required"],
        },
        state: {
            type: String,
            required: [true, "State is required"],
        },
        country: {
            type: String,
            required: [true, "Country is required"],
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    category: {
        type: String,
        default: "general",
        enum: [
            "general",
            "health-worker",
            "pharmacy",
            "hospital",
            "clinical-lab",
        ],
    },
    additional_properties: {
        type: mongoose.Schema.Types.ObjectId,
        required: function () {
            return this.category !== "general";
        },
        refPath: "references",
    },
    references: {
        type: String,
        enum: ["HealthWorker", "Pharmacy", "Hospital", "ClinicalLab"],
    },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcryptjs.hash(this.password, 12);
    }
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
