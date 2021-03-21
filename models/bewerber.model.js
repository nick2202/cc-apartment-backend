const mongoose = require("mongoose");

const BewerberSchema = mongoose.Schema({
        vorname: {
            type: String,
            required: true
        },
        nachname: {
            type: String,
        },
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("Bewerber", BewerberSchema);