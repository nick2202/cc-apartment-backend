const mongoose = require("mongoose");

const MatchingKriterienSchema = mongoose.Schema({
        geschlecht: [
            {
                type: String,
                required: true,
                enum: ["m", "w", "d"]
            }
        ],
        alter: [
            {
                type: Number,
                // required: true
            }
        ],
        raucher: [
            {
                type: String,
                required: true,
                enum: ["Raucher", "Nichtraucher"]
            }
        ],
        ernaehrung: [
            {
                type: String,
                // required: true,
                enum: ["vegan", "vegetarisch", "omnivor"]
            }
        ],
        taetigkeit: [
            {
                type: String,
                // required: true,
                enum: ["Student", "Schüler", "Azubi", "Praktikant", "arbeitslos", "berufstätig"]
            }
        ],
        politischeGesinnung: [
            {
                type: String,
                // required: true,
                enum: ["links", "rechts", "konservativ", "grün", "liberal", "unpolitisch"]
            }
        ],
        hobbies: [{
            brettspiele: {
                type: Number
            },
            videospiele: {
                type: Number
            },
            lesen: {
                type: Number
            },
            sport: {
                type: Number
            },
            reisen: {
                type: Number
            },
            feiernGehen: {
                type: Number
            },
            musizieren: {
                type: Number
            }
        }],
        interessen: [{
            politik: {
                type: Number
            },
            kultur: {
                type: Number
            },
            naturwisschenschaften: {
                type: Number
            },
            technik: {
                type: Number
            },
            sport: {
                type: Number
            }
        }]
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("MatchingKriteriens", MatchingKriterienSchema);

//generate JSON schema from model
// require('mongoose-schema-jsonschema')(mongoose);
// const jsonSchema = MatchingKriterienSchema.jsonSchema();
// console.dir(jsonSchema, {depth: null});