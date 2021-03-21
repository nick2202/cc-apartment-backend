const express = require("express");
const router = express();
const MatchingKriterien = require("../models/matching_kriterien.model");

router.post("/", async (req, res) => {
    const matchingKriterien = new MatchingKriterien(req.body);
    try {
        const savedMatchingKriterien = await matchingKriterien.save()
        res.json(savedMatchingKriterien);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;
