const express = require("express");
const ClinicalLab = require("../models/clinical-lab");

const router = express.Router();

router.post("/", (req, res, next) => {
    const clinicalLab = new ClinicalLab({
        name: req.body.name,
        location: req.body.location,
        tests: req.body.tests,
    });
    clinicalLab.save().then(doc => {
        console.log(doc);
        res.send(doc);
    }).catch(next);
});

module.exports = router;
