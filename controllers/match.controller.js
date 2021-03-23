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
            /*Kriterien, die zu einem Ausschluss führen können, wenn sie nicht bei
            Bewerber und WG die gleichen Werte haben*/
            "matchingKriterien.geschlecht": bew.matchingKriterien[0].geschlecht[0],
            "matchingKriterien.alter.0": {$lt: bew.matchingKriterien[0].alter[0]},
            "matchingKriterien.alter.1": {$gt: bew.matchingKriterien[0].alter[0]},
            "matchingKriterien.raucher": bew.matchingKriterien[0].raucher[0],
            "matchingKriterien.ernaehrung": bew.matchingKriterien[0].ernaehrung[0],
            "matchingKriterien.taetigkeit": bew.matchingKriterien[0].taetigkeit[0],
            "matchingKriterien.politischeGesinnung": bew.matchingKriterien[0].politischeGesinnung[0]
        });
        for (let i = 0; i < wgs.length; i++) {
            let sumHobbies =
                Math.abs(bew.matchingKriterien[0].hobbies[0].brettspiele - wgs[i].matchingKriterien[0].hobbies[0].brettspiele) +
                Math.abs(bew.matchingKriterien[0].hobbies[0].videospiele - wgs[i].matchingKriterien[0].hobbies[0].videospiele) +
                Math.abs(bew.matchingKriterien[0].hobbies[0].lesen - wgs[i].matchingKriterien[0].hobbies[0].lesen) +
                Math.abs(bew.matchingKriterien[0].hobbies[0].sport - wgs[i].matchingKriterien[0].hobbies[0].sport) +
                Math.abs(bew.matchingKriterien[0].hobbies[0].reisen - wgs[i].matchingKriterien[0].hobbies[0].reisen) +
                Math.abs(bew.matchingKriterien[0].hobbies[0].feiernGehen - wgs[i].matchingKriterien[0].hobbies[0].feiernGehen) +
                Math.abs(bew.matchingKriterien[0].hobbies[0].musizieren - wgs[i].matchingKriterien[0].hobbies[0].musizieren);

            let sumInteressen =
                Math.abs(bew.matchingKriterien[0].interessen[0].politik - wgs[i].matchingKriterien[0].interessen[0].politik) +
                Math.abs(bew.matchingKriterien[0].interessen[0].kultur - wgs[i].matchingKriterien[0].interessen[0].kultur) +
                Math.abs(bew.matchingKriterien[0].interessen[0].naturwisschenschaften - wgs[i].matchingKriterien[0].interessen[0].naturwisschenschaften) +
                Math.abs(bew.matchingKriterien[0].interessen[0].technik - wgs[i].matchingKriterien[0].interessen[0].technik) +
                Math.abs(bew.matchingKriterien[0].interessen[0].sport - wgs[i].matchingKriterien[0].interessen[0].sport);

            let matchingFaktor = 1 - ((sumHobbies + sumInteressen) / 12);
            const match = new Match({bewerber: bew._id, wg: wgs[i]._id, faktor: matchingFaktor});
            const savedMatch = await match.save();
        }
        res.json(wgs);
    } catch (err) {
        res.json({message: err});
    }
});