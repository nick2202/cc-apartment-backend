const mongoose = require("mongoose");
const MatchingKriterien = require("./matching_kriterien.model");
const Mitbewohner = require("./mitbewohner.model");

const WgSchema = mongoose.Schema({
        strasse: {
            type: String,
            required: true
        },
        hausnummer: {
            type: String,
            required: true
        },
        ort: {
            type: String,
            // required: true
        },
        plz: {
            type: String,
            // required: true
        },
        beschreibung: {
            type: String,
        },
        bilderUrls: [
            {type: String}
        ],
        mitbewohner:
            [Mitbewohner.schema],
        matchingKriterien:
            [MatchingKriterien.schema]
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("Wgs", WgSchema);