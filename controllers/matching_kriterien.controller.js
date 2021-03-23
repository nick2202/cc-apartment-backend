const MatchingKriterien = require("../models/matching_kriterien.model");
const Bewerber = require("../models/bewerber.model");
const Wg = require("../models/wg.model");


exports.createMatchingKriterienBew = (async (req, res, next) => {
    const matchingKriterien = new MatchingKriterien(req.body);
    try {
        const savedBewerber = await Bewerber.updateOne(
            {_id: req.params.bewerberId},
            {matchingKriterien: matchingKriterien}
        );
        next();
    } catch (err) {
        res.json({message: err});
    }
});

exports.createMatchingKriterienWg = (async (req, res, next) => {
    const matchingKriterien = new MatchingKriterien(req.body);
    try {
        const savedWg = await Wg.updateOne(
            {_id: req.params.wgId},
            {matchingKriterien: matchingKriterien}
        );
        next();
    } catch (err) {
        res.json({message: err});
    }
});

exports.updateMatchingKriterienBew = (async (req, res, next) => {
    try {
        let bewerber;
        bewerber = await Bewerber.findById(req.params.bewerberId);
        let mk;
        mk = await bewerber.matchingKriterien[0];
        await mk.set(req.body);
        bewerber.save();
        next();
    } catch (err) {
        res.json({message: err});
    }
});

exports.updateMatchingKriterienWg = (async (req, res, next) => {
    try {
        let wg;
        wg = await Wg.findById(req.params.wgId);
        let mk;
        mk = await wg.matchingKriterien[0];
        await mk.set(req.body);
        wg.save();
        console.log(mk);
        res.json(wg);
        next();
    } catch (err) {
        res.json({message: err});
    }
});

// exports.delete = (async (req, res) => {
//     try {
//         const removedMatchingKriterien = await MatchingKriterien.deleteOne({_id: req.params.matchingKriterienId});
//         res.json(removedMatchingKriterien);
//     } catch (err) {
//         res.json({message: err});
//     }
// });

exports.findByBewerberId = (async (req, res) => {
    try {
        let bewerber;
        bewerber = await Bewerber
            .findById(req.params.bewerberId);
        res.json(bewerber.matchingKriterien[0]);
    } catch (err) {
        res.json({message: err});
    }
});

exports.findByWgId = (async (req, res) => {
    try {
        let wg;
        wg = await Bewerber
            .findById(req.params.bewerberId);
        res.json(wg.matchingKriterien[0]);
    } catch (err) {
        res.json({message: err});
    }
});
