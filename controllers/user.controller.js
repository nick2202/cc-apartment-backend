const User = require("../models/user.model");
const Wg = require("../models/wg.model");
const Bewerber = require("../models/bewerber.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({path: "config/.env"});
const ENV = process.env;

exports.register = (async (req, res) => {
    let user = new User(req.body);
    try {
        const countEmail = await User.countDocuments({email: user.email});
        if (countEmail > 0) {
            res.status(422).json({message: "Mail already exists!"});
        }
        const isBewerber = await Bewerber.countDocuments({_id: user.profileId});
        const isWg = await Wg.countDocuments({_id: user.profileId});
        if (isBewerber > 0) {
            user.type = "bewerber";
        } else if (isWg > 0) {
            user.type = "wg";
        } else {
            res.status(422).json({message: "No associated Bewerber or WG exists, create one first by starting the registration process!"});
        }
        user.password = await bcrypt.hash(user.password, 10);
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({message: err});
    }
});

exports.login = (async (req, res) => {
    try {
        const user = await User.find({email: req.body.email});
        console.log(user[0].password)
        if (user == null) {
            return res.status(400).json({message: "No user found with given e-mail"})
        }
        console.log(user[0]._id)
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(result) {
                const token = jwt.sign(
                    {
                        userid: user[0]._id
                    },
                    ENV.SECRET,
                    {
                        expiresIn: "1h"
                    }
                );
                res.status(200).json({
                    message: "Auth successful",
                    token: token
                });
            } else {
                res.status(401).json({
                    message: "Auth failed"
                });
            }
        });
    } catch (err) {
        res.json({message: err});
    }
});


exports.logout = (async (req, res) => {
    try {
        await req.session.destroy
        res.json("SUCC");
    } catch (err) {
        res.json(err.message);
    }
});

exports.getAuth = (req, res) => {
    res.status(200).json({
        message: "Valid token"
    });
};



