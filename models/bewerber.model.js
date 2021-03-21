const mongoose = require("mongoose");

const BewerberSchema = mongoose.Schema({
        strasse: {
            type: String,
            // required: true
        },
        hausnummer: {
            type: Number,
            // required: true
        },
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("Bewerbers", BewerberSchema);