const mongoose = require('mongoose')
const Schema = mongoose.Schema


let UserSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('User', UserSchema)
