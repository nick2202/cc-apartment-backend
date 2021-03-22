const mongoose = require("mongoose");
const MatchingKriterien = require("./matching_kriterien.model");

const BewerberSchema = mongoose.Schema({
        vorname: {
            type: String,
            required: true
        },
        nachname: {
            type: String,
        },
        matchingKriterien:
            [MatchingKriterien.schema]
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("Bewerbers", BewerberSchema);