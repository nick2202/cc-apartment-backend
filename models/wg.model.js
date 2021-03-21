const mongoose = require("mongoose");

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
            required: true
        },
        plz: {
            type: String,
            required: true
        },
        beschreibung: {
            type: String,
        },
        bilderUrls: [
            {type: String}
        ],
        mitbewohner: [
            {type: mongoose.Schema.Types.ObjectId, ref: "Mitbewohner"}
        ],
        matchingKriterien:
            {type: mongoose.Schema.Types.ObjectId, ref: "MatchingKriterien"}
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("Wgs", WgSchema);