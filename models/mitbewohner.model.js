const mongoose = require("mongoose");

const MitbewohnerSchema = mongoose.Schema({
        vorname: {
            type: String,
            required: true
        },
        nachname: {
            type: String,
        },
        alter: {
            type: Number,
        },
        bilderUrls: [
            {type: String}
        ]
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("Mitbewohner", MitbewohnerSchema);