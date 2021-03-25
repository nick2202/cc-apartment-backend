const Bewerber = require("../models/bewerber.model");
const Wg = require("../models/wg.model");
const Match = require("../models/match.model");
const MatchingKriterien = require("../models/matching_kriterien.model");


exports.doMatchingBew = (async (req, res) => {
    try {
        let bew;
        bew = await Bewerber.findById(req.params.bewerberId);
        let oldMatches;
        oldMatches = await Match.deleteMany({bewerber: bew._id});
        let wgs;
        wgs = await Wg.find({
            /*
            Part of the MatchingKriterien, whose values have to match exactly so a Match can occur
             in the first place
             */
            "matchingKriterien.geschlecht": bew.matchingKriterien[0].geschlecht[0],
            "matchingKriterien.alter.0": {$lt: bew.matchingKriterien[0].alter[0]},
            "matchingKriterien.alter.1": {$gt: bew.matchingKriterien[0].alter[0]},
            "matchingKriterien.raucher": bew.matchingKriterien[0].raucher[0],
            "matchingKriterien.ernaehrung": bew.matchingKriterien[0].ernaehrung[0],
            "matchingKriterien.taetigkeit": bew.matchingKriterien[0].taetigkeit[0],
            "matchingKriterien.politischeGesinnung": bew.matchingKriterien[0].politischeGesinnung[0]
        });
        await calcFaktor(bew, wgs, "bewerber", "wg")
        res.json(res.locals.kriterien + "   Number of matches: " + wgs.length);
    } catch (err) {
        res.json({message: err});
    }
});

exports.doMatchingWg = async (req, res) => {
    try {
        let wg;
        wg = await Wg.findById(req.params.wgId);
        let oldMatches;
        oldMatches = await Match.deleteMany({wg: wg._id});
        let bews;
        bews = await Bewerber.find({
            /*
            Part of the MatchingKriterien, whose values have to match exactly so a Match can occur
            in the first place
            */
            "matchingKriterien.geschlecht": {$in: wg.matchingKriterien[0].geschlecht},
            "matchingKriterien.alter": {$gt: wg.matchingKriterien[0].alter[0], $lt: wg.matchingKriterien[0].alter[1]},
            "matchingKriterien.raucher": {$in: wg.matchingKriterien[0].raucher},
            "matchingKriterien.ernaehrung": {$in: wg.matchingKriterien[0].ernaehrung},
            "matchingKriterien.taetigkeit": {$in: wg.matchingKriterien[0].taetigkeit},
            "matchingKriterien.politischeGesinnung": {$in: wg.matchingKriterien[0].politischeGesinnung}
        });
        await calcFaktor(wg, bews, "wg", "bewerber");
        res.json(res.locals.kriterien + "   Number of matches: " + bews.length);
    } catch (err) {
        res.json({message: err});
    }
};

exports.getMatchesBew = async (req, res) => {
    try {
        const match = await Match.find({bewerber: req.params.bewerberId});
        res.json(match);
    } catch (err) {
        res.json({message: err});
    }
};

exports.getMatchesWg = async (req, res) => {
    try {
        const match = await Match.find({wg: req.params.wgId});
        res.json(match);
    } catch (err) {
        res.json({message: err});
    }
};

/*
Function to calculate the factor of the match for all MatchingKriterien in hobbies and interessen
of a Bewerber and a WG
*/
const calcFaktor = (entity, listWithMatches, keyEntity, keyListWithMatches) => {
    for (let i = 0; i < listWithMatches.length; i++) {
        let sumHobbies =
            Math.abs(entity.matchingKriterien[0].hobbies[0].brettspiele - listWithMatches[i].matchingKriterien[0].hobbies[0].brettspiele) +
            Math.abs(entity.matchingKriterien[0].hobbies[0].videospiele - listWithMatches[i].matchingKriterien[0].hobbies[0].videospiele) +
            Math.abs(entity.matchingKriterien[0].hobbies[0].lesen - listWithMatches[i].matchingKriterien[0].hobbies[0].lesen) +
            Math.abs(entity.matchingKriterien[0].hobbies[0].sport - listWithMatches[i].matchingKriterien[0].hobbies[0].sport) +
            Math.abs(entity.matchingKriterien[0].hobbies[0].reisen - listWithMatches[i].matchingKriterien[0].hobbies[0].reisen) +
            Math.abs(entity.matchingKriterien[0].hobbies[0].feiernGehen - listWithMatches[i].matchingKriterien[0].hobbies[0].feiernGehen) +
            Math.abs(entity.matchingKriterien[0].hobbies[0].musizieren - listWithMatches[i].matchingKriterien[0].hobbies[0].musizieren);

        let sumInteressen =
            Math.abs(entity.matchingKriterien[0].interessen[0].politik - listWithMatches[i].matchingKriterien[0].interessen[0].politik) +
            Math.abs(entity.matchingKriterien[0].interessen[0].kultur - listWithMatches[i].matchingKriterien[0].interessen[0].kultur) +
            Math.abs(entity.matchingKriterien[0].interessen[0].naturwisschenschaften - listWithMatches[i].matchingKriterien[0].interessen[0].naturwisschenschaften) +
            Math.abs(entity.matchingKriterien[0].interessen[0].technik - listWithMatches[i].matchingKriterien[0].interessen[0].technik) +
            Math.abs(entity.matchingKriterien[0].interessen[0].sport - listWithMatches[i].matchingKriterien[0].interessen[0].sport);

        let matchingFaktor = 1 - ((sumHobbies + sumInteressen) / 12);
        const match = new Match({
            [keyEntity]: entity._id,
            [keyListWithMatches]: listWithMatches[i]._id,
            faktor: matchingFaktor
        });
        const savedMatch = match.save();
    }
}