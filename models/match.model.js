const mongoose = require("mongoose");

const MatchSchema = mongoose.Schema({
        faktor: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        },
        wg:
            {type: mongoose.Schema.Types.ObjectId, ref: "Wgs"},
        bewerber:
            {type: mongoose.Schema.Types.ObjectId, ref: "Bewerber"}
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("Matches", MatchSchema);