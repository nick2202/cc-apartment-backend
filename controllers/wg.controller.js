const Wg = require("../models/wg.model");

exports.create = (async (req, res) => {
    const wg = new Wg(req.body);
    try {
        const savedWg = await wg.save()
        res.json(savedWg);
    } catch (err) {
        res.json({message: err});
    }
});

exports.findOne = (async (req, res) => {
    try {
        const wg = await Wg.findById(req.params.wgId);
        res.json(wg);
    } catch (err) {
        res.json({message: err});
    }
});

exports.update = (async (req, res) => {
    try {
        const updatedWg = await Wg.updateOne(
            {_id: req.params.wgId},
            {$set: req.body}
        );
        res.json(updatedWg);
    } catch (err) {
        res.json({message: err});
    }
});