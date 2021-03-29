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
        type: {
            type: String,
        }
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("Users", UserSchema);