const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        profileId: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("Users", UserSchema);