const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
        uid: {
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

module.exports = mongoose.model("UsersType", UserSchema);