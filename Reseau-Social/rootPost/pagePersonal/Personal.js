const TokenGenerator = require('uuid-token-generator');
const Friend = require('../../schemaData/friends')
const User = require('../../schemaData/Users')
const UserImage = require('../../schemaData/UserImage')
const Msg = require('../../schemaData/chats')
let todoImg = require('./todoImg/TodoImg.js')

module.exports = function alex(app, userSocket, userSocketLike, tockenTab) {

    todoImg(app, userSocket, userSocketLike, tockenTab)

    app.post('/imageTodo', (req, res) => {
        if (!(req.session && req.session.user && req.session.user.id === req.body.data))
          res.json({
            err: true,
          })
        else {
          UserImage.find({
            idUser: req.body.data
          }, (err, user) => {
            if (err)
            res.json({
              err: true,
            })
          if (user) {
            let gg= []
            let nb = 3
            let nbIstence = 0
            let users = user.reverse()
      
            users.forEach((element, index) => {
                if (index >= (nbIstence) && (index <= ((nbIstence-1) + nb)))
                    gg.push(element)
              });
      
            res.json({
              err: false,
              data: gg
            })
          }
      
          })
        }
      });


      app.post('/pushOtherI', (req, res) => {
        if (!(req.session && req.session.user && req.session.user.id === req.body.data))
          res.json({
            err: true,
          })
        else {
          UserImage.find({
            idUser: req.body.data
          }, (err, user) => {
            if (err)
            res.json({
              err: true,
            })
          if (user) {
            let gg = []
            let users = user.reverse()
            users.forEach((element, index) => {
              if (index >= (req.body.nbImage) && (index <= ((req.body.nbImage-1) + 3)))
                  gg.push(element)
            });
            res.json({
              err: false,
              data: gg
            })
          }
          })
        }
      });
}
