const Bewerber = require("../models/bewerber.model");

exports.findMany = (async (req, res) => {
    try {
        const bewerber = await Bewerber.find({
            "_id": {$in: [req.body]}
        }
        );
        res.json(bewerber);
    } catch (err) {
        res.json({message: err});
    }
});

exports.findOne = (async (req, res) => {
    try {
        const bewerber = await Bewerber.findById(req.params.bewerberId);
        res.json(bewerber);
    } catch (err) {
        res.json({message: err});
    }
});

exports.delete = (async (req, res) => {
    try {
        const removedBewerber = await Bewerber.deleteOne({_id: req.params.bewerberId});
        res.json(removedBewerber);
    } catch (err) {
        res.json({message: err});
    }
});

exports.create = (async (req, res) => {
    const bewerber = new Bewerber(req.body);
    try {
        const savedBewerber = await bewerber.save()
        res.setHeader('content-type', 'application/json');
        res.json(savedBewerber);
    } catch (err) {
        res.json({message: err});
    }
});

exports.update = (async (req, res) => {
    try {
        const updatedBewerber = await Bewerber.updateOne(
            {_id: req.params.bewerberId},
            {$set: req.body}
        );
        res.json(updatedBewerber);
    } catch (err) {
        res.json({message: err});
    }
});