const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const wgSchema = new Schema({
    userName: String,
    strasse: String,
    hausNummer: Number,
    plz: Number,
    ort: String,
    email: String,
    password: String,
    permissionLevel: Number
});

wgSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
wgSchema.set('toJSON', {
    virtuals: true
});

wgSchema.findById = function (cb) {
    return this.model('Users').find({id: this.id}, cb);
};

const Wg = mongoose.model('Wgs', wgSchema);


exports.findByEmail = (email) => {
    return Wg.find({email: email});
};
exports.findById = (id) => {
    return Wg.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createWg = (wgData) => {
    const wg = new Wg(wgData);
    return wg.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Wg.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, wgs) {
                if (err) {
                    reject(err);
                } else {
                    resolve(wgs);
                }
            })
    });
};

exports.patchWg = (id, wgData) => {
    return Wg.findOneAndUpdate({
        _id: id
    }, wgData);
};

exports.removeById = (wgId) => {
    return new Promise((resolve, reject) => {
        Wg.deleteMany({_id: wgId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

