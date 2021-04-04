const Userm = require("../models/user.model");
const Wg = require("../models/wg.model");
const Bewerber = require("../models/bewerber.model");

const Realm = require("realm");
const app = new Realm.App({ id: "cc-apartment-cgfxu" });

exports.registerBewerber = (async (req, res) => {
    try {
        console.log("aa")
        const userm = new Userm(req.body);
        console.log(userm)
        await app.emailPasswordAuth.registerUser(userm.email, userm.password);

        const updatedWg = await Bewerber.updateOne(
            {_id: req.params.wgId},
            {userId: userm._id}
        );

        res.json(userm);
    } catch (err) {
        res.json({message: err});
    }
});

exports.registerWg = (async (req, res) => {
    try {
        console.log("aa")
        const userm = new Userm(req.body);
        console.log(userm)
        console.log(req.params.wgId)
        const registeredUser = await app.emailPasswordAuth.registerUser(userm.email, userm.password);
        const credentials = Realm.Credentials.emailPassword(userm.email, userm.password);
        const loggedInUser = await app.logIn(credentials);
        const id = app.currentUser.id;

        const updatedWg = await Wg.updateOne(
            {_id: req.params.wgId},
            {userId: id}
        );
        res.json({
            user: id,
            wgId: req.params.wgId,
            updatedWg: updatedWg
        });
    } catch (err) {
        res.json({message: err});
    }
});

exports.loginBewerber = (async (req,res) => {
    try {
        const userm = new Userm(req.body);

        const credentials = Realm.Credentials.emailPassword(userm.email, userm.password);
        const user = await app.logIn(credentials);
        const token = app.currentUser.accessToken;
        console.log(token)
        const bew = await Bewerber.find({userId: userId})
        console.log(bew._id)
            Realm.

        res.json({token: token});
    } catch (err) {
        res.json({message: err});
    }
});

exports.loginWg = (async (req,res) => {
    try {
        const userm = new Userm(req.body);

        const credentials = Realm.Credentials.emailPassword(userm.email, userm.password);
        const user = await app.logIn(credentials);
        const userId = app.currentUser.id
        const token = app.currentUser.accessToken;
        console.log(token)
        console.log(userId)
        const wg = await Wg.find({userId: userId})
        console.log(wg._id)

        res.json({token: token});
    } catch (err) {
        res.json({message: err});
    }
});



exports.logout = (async(req,res) => {
    try {
        await app.currentUser.logOut();
        res.json("SUCC");
    } catch (err) {
        res.json(err.message);
    }
});



