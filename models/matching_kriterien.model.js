const mongoose = require("mongoose");

const MatchingKriterienSchema = mongoose.Schema({
        geschlecht:
            {
                type: [String],
                default: undefined,
                required: true,
                validate: [(v) => v.length > 0, "Geschlecht is required"],
                enum: ["m", "w", "d"]
            }
        ,
        alter:
            {
                type: [Number],
                required: true
            }
        ,
        raucher:
            {
                type: [String],
                required: true,
                enum: ["Raucher", "Nichtraucher"]
            }
        ,
        ernaehrung:
            {
                type: [String],
                required: true,
                enum: ["vegan", "vegetarisch", "omnivor"]
            }
        ,
        taetigkeit:
            {
                type: [String],
                required: true,
                enum: ["Student", "Schüler", "Azubi", "Praktikant", "arbeitslos", "berufstätig"]
            }
        ,
        politischeGesinnung:
            {
                type: [String],
                required: true,
                validate: [(v) => v.length > 0, "No pG"],
                enum: ["links", "rechts", "konservativ", "grün", "liberal", "unpolitisch"]
            }
        ,
        hobbies: [{
            brettspiele: {
                type: Number,
                required: true
            },
            videospiele: {
                type: Number,
                required: true
            },
            lesen: {
                type: Number,
                required: true
            },
            sport: {
                type: Number,
                required: true
            },
            reisen: {
                type: Number,
                required: true
            },
            feiernGehen: {
                type: Number,
                required: true
            },
            musizieren: {
                type: Number,
                required: true
            }
        }],
        interessen: [{
            politik: {
                type: Number,
                required: true
            },
            kultur: {
                type: Number,
                required: true
            },
            naturwisschenschaften: {
                type: Number,
                required: true
            },
            technik: {
                type: Number,
                required: true
            },
            sport: {
                type: Number,
                required: true
            }
        }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("MatchingKriteriens", MatchingKriterienSchema);

// generate JSON schema from model
// require('mongoose-schema-jsonschema')(mongoose);
// const jsonSchema = MatchingKriterienSchema.jsonSchema();
// console.dir(jsonSchema, {depth: null});