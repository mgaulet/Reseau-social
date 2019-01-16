const TokenGenerator = require('uuid-token-generator');
const Friend = require('../../schemaData/friends')
const User = require('../../schemaData/Users')
const UserImage = require('../../schemaData/UserImage')
const Msg = require('../../schemaData/chats')

module.exports = function alex(app, userSocket, userSocketLike, tockenTab) {

    app.post('/getUsers', (req, res) => {

        User.find({
        },
          (err, user) => {
            if (err)
              res.json({
                err: 1
              })
        
            let users = user.map((use) => {
              return {
                name: use.name,
                lastName: use.lastName,
                _id: use._id,
                email: use.email
              }
            })
            res.json({
              todos: users
            })
        })
    })
}





