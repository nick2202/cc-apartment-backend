const Userm = require("../models/user.model");
const Usert = require("../models/usertype.model");

const Realm = require("realm");
const app = new Realm.App({ id: "cc-apartment-cgfxu" });

exports.register = (async (req, res) => {
    try {
        const userm = new Userm(req.body);

        await app.emailPasswordAuth.registerUser(userm.params.email, userm.params.password);

        const userid = app.currentUser.id

        const usert = CreateUsertype(userid,req);

        res.json(usert);
    } catch (err) {
        res.json({message: err});
    }
});

exports.login = (async(req,res) => {
    try {
        const userm = new Userm(req.body);

        const credentials = Realm.Credentials.emailPassword(userm.params.email,userm.params.password);
        const user = await app.logIn(credentials);

        const userT = await GetUsertype(user.id);

        res.json(userT);
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

CreateUsertype = (async(userid,req) => {
    try{
        const userm = new Userm(req.body);
        const userType = new Usert({$set: {uid:userid,
                                               type:userm.params.type}});
        await userType.save()
        return userType;
    }catch(err){

    }
});

GetUsertype = (async(userid) => {
    try{
        var userT = await Usert.findById(userid);
        userT = new Usert(userT);
        return userT;
    }catch(err){

    }
});


