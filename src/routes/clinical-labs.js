const express = require("express");
const ClinicalLab = require("../models/clinical-lab");

const router = express.Router();

router.get("/search", async (req, res, next) => {
    const query = req.query.query;
    console.log(query);
    const results = await ClinicalLab.aggregate([
        {
            "$search": {
                "index": "clinicalLab",
                "autocomplete": {
                    "query": query,
                    "path": "name",
                }
            },
        },
        {
            "$match": {
                "$or": [
                    {
                        "tests": "MRI"
                    },
                    {
                        "tests": "X-Ray"
                    }
                ]
            }
        },
        {
            "$facet": {
                "totalCount": [{ "$count": "count" }],
                "results": [{ "$limit": 100 }],
            },
        },
    ]).exec();
    console.log(results)
    res.send(results);
});

router.post("/add", (req, res, next) => {
    const clinicalLab = new ClinicalLab({
        name: req.body.name,
        location: req.body.location,
        tests: req.body.tests,
    });
    clinicalLab
        .save()
        .then((doc) => {
            console.log(doc);
            res.send(doc);
        })
        .catch(next);
});

module.exports = router;
