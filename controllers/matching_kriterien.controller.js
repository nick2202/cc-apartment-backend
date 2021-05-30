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
        res.json(savedBewerber);
        // res.locals.kriterien = "MatchingKriterien created successfully!";
        // next();
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
        console.log(req.body)
        // res.locals.kriterien = "MatchingKriterien created successfully!";
        // next();
        res.json(savedWg);
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
        console.log(req.body)
        console.log(mk)
        bewerber.save();
        res.locals.kriterien = "MatchingKriterien updated successfully!";
        next();
    } catch (err) {
        res.status(500).json({message: "Updating of MatchingKriterien failed"});
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
        res.locals.kriterien = "MatchingKriterien updated successfully!";
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
