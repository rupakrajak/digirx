const express = require("express");
const Prescription = require("../models/prescription");

const router = express.Router();

router.post("/add-prescription", async (req, res, next) => {
    try {
        const prescription = new Prescription(req.body);
        const temp = await prescription.save();
        const response = {
            status: "success",
            message: "Prescription added successfully.",
            result: {
                uid: temp.uid,
                did: temp.did,
            },
            request: {
                method: req.method,
                url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
            },
        };
        res.status(201).send(response);
    } catch(err) {
        err.status = 422;
        console.log(err);
        next(err);
    }
})

module.exports = router;