const express = require("express");
const router = express();
const Bewerber = require("../models/bewerber.model");

//Get all
router.get("/", async (req, res) => {
    try {
        const bewerber = await Bewerber.find();
        res.json(bewerber);
    } catch (err) {
        res.json({message: err});
    }
});

//Get one
router.get("/:bewerberId", async (req, res) => {
    try {
        const bewerber = await Bewerber.findById(req.params.bewerberId);
        res.json(bewerber);
    } catch (err) {
        res.json({message: err});
    }
});

//Delete one
router.delete("/:bewerberId", async (req, res) => {
    try {
        const removedBewerber = await Bewerber.deleteOne({_id: req.params.bewerberId});
        res.json(removedBewerber);
    } catch (err) {
        res.json({message: err});
    }
})

//Create one
router.post("/", async (req, res) => {
    const bewerber = new Bewerber({
        strasse: req.body.strasse,
        hausnummer: req.body.hausnummer
    });
    try {
        const savedBewerber = await bewerber.save()
        res.json(savedBewerber);
    } catch (err) {
        res.json({message: err});
    }
});

router.patch("/:bewerberId", async (req, res) => {
    try {
        const updatedBewerber = await Bewerber.updateOne(
            {_id: req.params.bewerberId},
            {$set: {email: req.body.email}}
            );
        res.json(updatedBewerber);
    } catch (err) {
        res.json({message: err});
    }
})

module.exports = router;