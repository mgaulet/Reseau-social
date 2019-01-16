const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ChatSchema = new Schema({
    msg: {
        type: Array,
        default: [],
        // messagenoyer: [
        //     {
        //           emmeter: Id 
        //           msg: 'deondejkdn ntm!'
        //      }
        // ]
    }
})

module.exports = mongoose.model('Chat', ChatSchema)
