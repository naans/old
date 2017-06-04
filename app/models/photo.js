const mongoose = require('mongoose')
    , config   = require('config')
    , Schema   = mongoose.Schema

const PhotoSchema = new Schema({
    ext: String,
    size: Number
})

PhotoSchema.virtual('url').get(function () {
    return `${config.get('domain')}/${config.get('photos_path')}/${this.id}.${this.ext}`
})

PhotoSchema.virtual('path').get(function () {
    return `${config.get('root')}/${config.get('photos_path')}/${this.id}.${this.ext}`
})

PhotoSchema.set('toObject', { transform: (photo, ret, opts) => {
    return {
        id:   photo.id,
        url:  photo.url,
        ext:  photo.ext,
        size: photo.size
    }
}});

module.exports = mongoose.model('Picture', PhotoSchema)
