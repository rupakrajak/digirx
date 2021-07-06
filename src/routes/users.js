const mongoose = require("mongoose");
const express = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const HealthWorker = require("../models/health-worker");
const Pharmacy = require("../models/pharmacy");
const Hospital = require("../models/Hospital");
const ClinicalLab = require("../models/clinical-lab");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        let docs = await User.find().limit(100);
        docs.forEach((doc) => {
            doc.password = undefined;
            doc.__v = undefined;
        });
        const response = {
            status: "success",
            message: "Results fetched successfully.",
            count: docs.length,
            result: docs,
            request: {
                method: req.method,
                url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
            },
        };
        res.send(response);
    } catch (err) {
        next(err);
    }
});

router.get("/user", async (req, res, next) => {
    try {
        const docs = await User.find(req.query);
        docs.forEach((doc) => {
            doc.password = undefined;
            doc.__v = undefined;
        });
        const response = {
            status: "success",
            message: "Results fetched successfully.",
            count: docs.length,
            result: docs,
            request: {
                method: req.method,
                url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
            },
        };
        res.send(response);
    } catch (err) {
        err.status = 422;
        next(err);
    }
});

router.get("/user/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const doc = await User.findById(id);
        doc.password = undefined;
        doc.__v = undefined;
        const response = {
            status: "success",
            message: "Results fetched successfully.",
            result: doc,
            request: {
                method: req.method,
                url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
            },
        };
        res.send(response);
    } catch (err) {
        err.status = 422;
        next(err);
    }
});

router.post("/register", async (req, res, next) => {
    let temp;

    switch (req.body.category) {
        case "health-worker":
            try {
                const additional_properties = new HealthWorker(
                    req.body.additional_properties
                );
                temp = await additional_properties.save();
            } catch (err) {
                err.status = 422;
                next(err);
            }
            break;
        case "pharmacy":
            try {
                const additional_properties = new Pharmacy(
                    req.body.additional_properties
                );
                temp = await additional_properties.save();
            } catch (err) {
                err.status = 422;
                next(err);
            }
            break;
        case "hospital":
            try {
                const additional_properties = new Hospital(
                    req.body.additional_properties
                );
                temp = await additional_properties.save();
            } catch (err) {
                err.status = 422;
                next(err);
            }
            break;
        case "clinical-lab":
            try {
                const additional_properties = new ClinicalLab(
                    req.body.additional_properties
                );
                temp = await additional_properties.save();
            } catch (err) {
                err.status = 422;
                next(err);
            }
            break;
    }
    try {
        if (temp) req.body.additional_properties = temp._id;
        const user = await User(req.body).save();
        const response = {
            status: "success",
            message: "User added successfully.",
            result: {
                name: user.name,
                email: user.email,
                mobile: user.mobile,
            },
            request: {
                method: req.method,
                url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
            },
        };
        res.status(201).send(response);
    } catch (err) {
        err.status = 422;
        switch (req.body.category) {
            case "health-worker":
                if (temp) await HealthWorker.findByIdAndDelete(temp._id);
                break;
            case "pharmacy":
                if (temp) await Pharmacy.findByIdAndDelete(temp._id);
                break;
            case "hospital":
                if (temp) await Hospital.findByIdAndDelete(temp._id);
                break;
            case "clinical-lab":
                if (temp) await ClinicalLab.findByIdAndDelete(temp._id);
                break;
        }
        next(err);
    }
});

router.get("/search/:category", async (req, res, next) => {
    const category = req.params.category;
    const query = req.query.query;
    console.log(category, query);
    const pipeline = [
        {
            "$search": {
                "index": "users",
                "compound": {
                    "must": [
                        {
                            "autocomplete": {
                                "query": query,
                                "path": "name.firstname",
                            },
                        },
                        {
                            "queryString": {
                                "defaultPath": "category",
                                "query": category,
                            },
                        },
                    ],
                },
            },
        },
        {
            "$facet": {
                "totalCount": [{ "$count": "count" }],
                "results": [{ "$limit": 100 }],
            },
        },
    ];

    if (category === "health-worker")
        pipeline.splice(1, 0, {
            "$lookup": {
                from: "healthworkers",
                localField: "additional_properties",
                foreignField: "_id",
                as: "details"
            }
        })

    const results = await User.aggregate(pipeline).exec();
    console.log(results);
    res.send(results);
});

router.post("/auth", async (req, res, next) => {
    try {
        const body = req.body.body;
        console.log(body);
        const user = await User.find({ email: body.email });
        if (user.length === 0) {
            let err = new Error("Invalid Credentials");
            err.status = 403;
            next(err);
        } else {
            const verify = await bcryptjs.compare(
                body.password,
                user[0].password
            );
            if (!verify) {
                let err = new Error("Invalid Credentials");
                err.status = 403;
                next(err);
            } else {
                const response = {
                    status: "success",
                    message: "User Authenticated",
                    request: {
                        method: req.method,
                        url: `${req.protocol}://${req.get("host")}${
                            req.originalUrl
                        }`,
                    },
                };
                res.send(response);
            }
        }
    } catch (err) {
        next(err);
    }
});

router.delete("/delete-account/:id", async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        await User.findByIdAndDelete(id);
        const response = {
            status: "success",
            message: "User removed successfully.",
            request: {
                method: req.method,
                url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
            },
        };
        res.status(202).send(response);
    } catch (err) {
        err.status = 400;
        next(err);
    }
});

module.exports = router;
