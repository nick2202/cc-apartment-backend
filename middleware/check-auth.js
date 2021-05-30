const jwt = require("jsonwebtoken");
require("dotenv").config({path: "config/.env"});
const ENV = process.env;
const User = require("../models/user.model");
const Bewerber = require("../models/bewerber.model");
const Wg = require("../models/wg.model");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, ENV.SECRET);
        const user = await User.findById(decoded.userid);
        if (user == null) {
            res.status(401).json({
                message: "Auth failed"
            });
        } else {
            let profile;
            if (user.type === "bewerber") {
                profile = await Bewerber.findById(user.profileId);
            } else {
                profile = await Wg.findById(user.profileId);
                console.log("wg")
            }
            console.log("auth succ")
            console.log(profile._id)
            req.profileId = profile._id
            req.userToken = decoded;
            next();
        }
    } catch (err) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
};