const Bewerber = require("../models/bewerber.model");
const Wg = require("../models/wg.model");
const Match = require("../models/match.model");
const MatchingKriterien = require("../models/matching_kriterien.model");


exports.doMatching = (async (req, res) => {
    try {
        var bewerber;
        bewerber = await Bewerber.findById(req.params.bewerberId);
        var wg;
        wg = await Wg.find({
            "matchingKriterien.geschlecht":
                bewerber.matchingKriterien[0].geschlecht[0]
        });
        // const match = await new Match({bewerber: bewerber.body._id, wg: wg.body._id});
        // await match.save();
        res.json(wg);
    } catch (err) {
        res.json({message: err});
    }
});