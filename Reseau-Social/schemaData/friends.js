const mongoose = require('mongoose')
const Schema = mongoose.Schema


let FriendSchema = new Schema({
    idUser: {
        type: String,
        default: ''
    },

    private: {
        type: Boolean,
        default: false
    },

    name: {
        type: String,
        default: ''
    },
    
    lastName: {
        type: String,
        default: ''
    },

    followers: {
        type: Array,
        default: []
        // {
        //     id: ?,
        //     name: ?,
        //     lastname: ?
        // },
    },

    followed: {
        type: Array,
        default: []
        // {
        //     id: ?,
        //     name: ?,
        //     lastname: ?
        // },
    },

    reqFriends: {
        type: Array,
        default: []
        // {
        //     id: ?,
        //     name: ?,
        //     lastname: ?
        // },
    },
    linkMsg: {
        type: Array,
        default: []
        // {
        //     idFriend: ?,
        //     IdLien: _id
        // },
    }
})

module.exports = mongoose.model('Friend', FriendSchema)
