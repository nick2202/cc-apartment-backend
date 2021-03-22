const MatchingKriterien = require("../models/matching_kriterien.model");
const Bewerber = require("../models/bewerber.model");
const Wg = require("../models/wg.model");


exports.findByBewerberId = (async (req, res) => {
    try {
        const matchingKriterien = await Bewerber
            .findById(req.params.bewerberId)
            .populate("matchingKriterien");
        res.json(matchingKriterien);
    } catch (err) {
        res.json({message: err});
    }
});

exports.findByWgId = (async (req, res) => {
    try {
        const matchingKriterien = await Wg
            .findById(req.params.wgId)
            .populate("matchingKriterien");
        res.json(matchingKriterien);
    } catch (err) {
        res.json({message: err});
    }
});

exports.delete = (async (req, res) => {
    try {
        const removedMatchingKriterien = await MatchingKriterien.deleteOne({_id: req.params.matchingKriterienId});
        res.json(removedMatchingKriterien);
    } catch (err) {
        res.json({message: err});
    }
});

exports.createMatchingKriterienWg = (async (req, res) => {
    const matchingKriterien = new MatchingKriterien(req.body);
    try {
        const savedWg = await Wg.updateOne(
            {_id: req.params.wgId},
            {matchingKriterien: matchingKriterien}
        );
        res.json(savedWg);
    } catch (err) {
        res.json({message: err});
    }
});

exports.createMatchingKriterienBew = (async (req, res) => {
    const matchingKriterien = new MatchingKriterien(req.body);
    try {
        const savedBewerber = await Bewerber.updateOne(
            {_id: req.params.bewerberId},
            {matchingKriterien: matchingKriterien}
        );
        res.json(savedBewerber);
    } catch (err) {
        res.json({message: err});
    }
});

exports.updateMatchingKriterienBew = (async (req, res, next) => {
    try {
        var bewerber;
        bewerber = await Bewerber.findById(req.params.bewerberId);
        const mk = bewerber.matchingKriterien[0];
        mk.set(req.body);
        bewerber.save();
        res.json(mk);
        next();
    } catch (err) {
        res.json({message: err});
    }
});


exports.updateMatchingKriterienWg = (async (req, res) => {
    try {
        var wg;
        wg = await Wg.findById(req.params.wgId);
        console.log(wg)
        const mk = wg.matchingKriterien[0];
        mk.set(req.body);
        wg.save();
        console.log(mk)
        res.json(mk);
        // next();
    } catch (err) {
        res.json({message: err});
    }
});