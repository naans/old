const mongoose = require('mongoose')
    , Schema   = mongoose.Schema

module.exports = mongoose.model('Selfie', new Schema({
    photo: { type: Schema.Types.ObjectId, ref: 'Photo'},
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    likers: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    dislikers: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    location: {
        latitude: Number,
        longitude: Number
    },
    time: Date,
    suspended: Boolean // true when selfie is flagged as inapropriate
}))
