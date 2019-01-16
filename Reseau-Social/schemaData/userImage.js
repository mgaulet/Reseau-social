const mongoose = require('mongoose')
const Schema = mongoose.Schema

// [{
//     _id: '5baaa56c8aabaf210fe967ed,
//     idUser: c8aabaf210fe967e,
//     name: 0,
//     type: ".jpg",
//     like: 34,
//     content: " trop beau ce paysage!"
//     url: "./imageUser/c8aabaf210fe967e/c8aabaf210fe967e + 0 + .jpg"
// }]

let UserImage = new Schema({
    idUser: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    like: {
        type: Array,
        default: []
    },
    commentary: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    },
})

module.exports = mongoose.model('UserImage', UserImage)
