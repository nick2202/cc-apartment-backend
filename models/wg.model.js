const mongoose = require("mongoose");

const WgSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    },
{
    timestamps: true
});

module.exports = mongoose.model("Wgs", WgSchema);