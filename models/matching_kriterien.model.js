const mongoose = require("mongoose");
const {Schema} = mongoose;

const MatchingKriterienSchema = mongoose.Schema({
        geschlecht:
            {
                type: [String],
                enum: ["m", "w", "d"]
            },
        alter:
            {
                type: [Number],
            },
        raucher:
            {
                type: [String],
                enum: ["Raucher", "Nichtraucher"]
            },
        ernaehrung:
            {
                type: [String],
                enum: ["vegan", "vegetarisch", "omnivor"]
            },
        taetigkeit:
            {
                type: [String],
                enum: ["Student", "Schüler", "Azubi", "Praktikant", "arbeitslos", "berufstätig"]
            },
        politischeGesinnung:
            {
                type: [String],
                enum: ["links", "rechts", "konservativ", "grün", "liberal", "unpolitisch"]
            },
        hobbies: [{
            brettspiele: {
                type: Number,
            },
            videospiele: {
                type: Number,
            },
            lesen: {
                type: Number,
            },
            sport: {
                type: Number,
            },
            reisen: {
                type: Number,
            },
            feiernGehen: {
                type: Number,
            },
            musizieren: {
                type: Number,
            }
        }],
        interessen: [{
            politik: {
                type: Number,
            },
            kultur: {
                type: Number,
            },
            naturwisschenschaften: {
                type: Number,
            },
            technik: {
                type: Number,
            },
            sport: {
                type: Number,
            }
        }]
    },
    {timestamps: true}
);

MatchingKriterienSchema.pre("save", function(next) {
    if (!this.hobbies ||this.hobbies.length === 0)
        this.hobbies.push({"brettspiele": 1});
    if (!this.interessen || this.interessen.length === 0)
        this.interessen.push({"politik": 1});
    next();
});

module.exports = mongoose.model("matchingKriteriens", MatchingKriterienSchema);

// generate JSON schema from model
// require('mongoose-schema-jsonschema')(mongoose);
// const jsonSchema = MatchingKriterienSchema.jsonSchema();
// console.dir(jsonSchema, {depth: null});