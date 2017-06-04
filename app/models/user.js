const mongoose = require('mongoose')
    , Schema   = mongoose.Schema

module.exports = mongoose.model('User', new Schema({
    username: String,
    email: String,
    password: String,
    fullName: String,
    picture: String,
    type: String, // normal, moderator, admin
    socialLinks: {
        facebook: String,
        twitter: String,
        instagram: String,
        googleplus: String
    },
    showSocialLinks: Boolean,
    totalLikes: Number,
    timezoneOffset: Number, // the N for which UTC+N is the local timezone of user
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    subscriptions: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    selfies: [{ type: Schema.Types.ObjectId, ref: 'Selfie'}]
}))
