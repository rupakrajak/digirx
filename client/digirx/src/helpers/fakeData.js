const axios = require("axios");
const csv = require("csv-parser");
const fs = require("fs");
const faker = require("faker");
const healthCareJobTitles = require("./heathCareJobTitles.json");
const medicalDegrees = require("./medicalDegrees.json");

const indianLocations = new Array();
// fs.createReadStream("./src/helpers/IndianLocations.csv")
//     .pipe(csv())
//     .on("data", (row) => {
//         indianLocations.push(row);
//     })
//     .on("end", () => {
//         console.log("CSV file successfully processed");
//         insert();
//     });

const insert = () => {
    const LIMIT = 300;
    for (let i = 0; i < LIMIT; i++) {
        const idx = faker.datatype.number({
            min: 0,
            max: indianLocations.length - 1,
        });
        let body = {
            gender: faker.random.arrayElement(["male", "female", "other"]),
            name: {
                firstname: faker.name.firstName(),
                middlename: faker.name.firstName(),
                lastname: faker.name.lastName(),
            },
            email: faker.internet.email().toLowerCase(),
            mobile: Number(faker.phone.phoneNumber("##########")),
            dob: faker.date.past(16, new Date()),
            bloodgrp: faker.random.arrayElement([
                "O+",
                "A+",
                "B+",
                "AB+",
                "O-",
                "A-",
                "B-",
                "AB-",
            ]),
            residence: {
                addressline1: faker.address.secondaryAddress(),
                addressline2: faker.address.streetName(),
                city_village: indianLocations[idx].place_name,
                district: indianLocations[idx].place_name,
                pincode: Number(indianLocations[idx].key.substring(3)),
                state: indianLocations[idx].admin_name1,
                country: "India",
            },
            password: "Hello123",
        };

        const cat = i % 5;
        body.category = [
            "general",
            "health-worker",
            "pharmacy",
            "hospital",
            "clinical-lab",
        ][cat];

        switch (body.category) {
            case "health-worker":
                body.additional_properties = {
                    title: faker.random.arrayElement(healthCareJobTitles).title,
                    degrees: [
                        {
                            degree: faker.random.arrayElement(
                                medicalDegrees.Undergraduate
                            ),
                        },
                        {
                            degree: faker.random.arrayElement(
                                medicalDegrees.Postgraduate
                            ),
                        },
                    ],
                    specializations: [],
                    work_at: null,
                    daily_patient_limit: faker.datatype.number({
                        min: 20,
                        max: 100,
                    }),
                };
                break;
            case "pharmacy":
                body.additional_properties = {
                    name: `${faker.company.companyName()} Pharmacy`,
                    location: {
                        ...body.residence,
                        coords: {
                            type: "Point",
                            coordinates: [
                                (
                                    parseFloat(indianLocations[idx].longitude) +
                                    faker.datatype.float({
                                        min: -0.01,
                                        max: 0.01,
                                    })
                                ).toFixed(6),
                                (
                                    parseFloat(indianLocations[idx].latitude) +
                                    faker.datatype.float({
                                        min: -0.01,
                                        max: 0.01,
                                    })
                                ).toFixed(6),
                            ],
                        },
                    },
                };
                break;
            case "hospital":
                body.additional_properties = {
                    name: `${faker.company.companyName()} ${faker.random.arrayElement(
                        ["Hospital", "Clinic", "Nursing Home"]
                    )}`,
                    location: {
                        ...body.residence,
                        coords: {
                            type: "Point",
                            coordinates: [
                                (
                                    parseFloat(indianLocations[idx].longitude) +
                                    faker.datatype.float({
                                        min: -0.01,
                                        max: 0.01,
                                    })
                                ).toFixed(6),
                                (
                                    parseFloat(indianLocations[idx].latitude) +
                                    faker.datatype.float({
                                        min: -0.01,
                                        max: 0.01,
                                    })
                                ).toFixed(6),
                            ],
                        },
                    },
                    services_available: [],
                };
                break;
            case "clinical-lab":
                body.additional_properties = {
                    name: `${faker.company.companyName()} Lab`,
                    location: {
                        ...body.residence,
                        coords: {
                            type: "Point",
                            coordinates: [
                                (
                                    parseFloat(indianLocations[idx].longitude) +
                                    faker.datatype.float({
                                        min: -0.01,
                                        max: 0.01,
                                    })
                                ).toFixed(6),
                                (
                                    parseFloat(indianLocations[idx].latitude) +
                                    faker.datatype.float({
                                        min: -0.01,
                                        max: 0.01,
                                    })
                                ).toFixed(6),
                            ],
                        },
                    },
                    tests: [
                        faker.random.arrayElement([
                            "Blood Test",
                            "X-Ray",
                            "MRI",
                            "CT-Scan",
                            "Sonography",
                        ]),
                    ],
                };
                break;
            default:
                body.additional_properties = null;
        }
        // console.log(body);
        // if (body.additional_properties && body.additional_properties.location)
        //     console.log(body.additional_properties.location[0]);
        (async () => {
            const URL = "http://localhost:8000/users/register";
            try {
                const response = await axios.post(URL, body);
                if (response.status === 201) {
                    console.log("USER ADDED.\nDETAILS:");
                    console.log(response.data);
                } else {
                    console.log(response.data);
                }
            } catch (err) {
                console.error(`ERROR: ${err}`);
            }
        })();
    }
};


