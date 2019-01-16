const TokenGenerator = require('uuid-token-generator');
const Friend = require('../../schemaData/friends')
const User = require('../../schemaData/Users')
const UserImage = require('../../schemaData/UserImage')
const Msg = require('../../schemaData/chats')

module.exports = function alex(app, userSocket, userSocketLike, tockenTab) {

    app.post('/getNotifs', (req, res) => {
        if (req.session && req.session.user && req.session.user.id === req.body.myId) {
          Friend.find({
            idUser: req.body.myId
          }, (err, user) => {
            if (!err && user[0]) {
              res.json({
                err: false,
                data: user[0].reqFriends
              })
            } else res.json({ err: true })
          })
        }else res.json({ err: true })
    })

}


  