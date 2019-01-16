const TokenGenerator = require('uuid-token-generator');
const Friend = require('../../schemaData/friends')
const User = require('../../schemaData/Users')
const UserImage = require('../../schemaData/UserImage')
const Msg = require('../../schemaData/chats')

module.exports = function alex(app, userSocket, userSocketLike, tockenTab) {

    app.post("/likeImg", (req, res) => {
        if (req.session && req.session.user && req.session.user.id === req.body.myId) {
          UserImage.find({
            _id: req.body.idImg
          }, (err, img) => {
            let success = false
            if (err || !img[0]) res.json({err: true, msg: "user 1"})
            else {
              if (req.body.liked && !img[0].like.find((elem) => elem.id === req.body.myId)) {
                img[0].like.push({id: req.session.user.id, name: req.session.user.name, lastName: req.session.user.lastName})
                success = true
              } else if (!req.body.liked && img[0].like.find((elem) => elem.id === req.body.myId)) {
                img[0].like = img[0].like.filter((elem) => elem.id !== req.body.myId)
                success = true
              }
              if (success) {
                img[0].save((err) => {
                  if (err) res.json({err: true, msg: "user 2"})
                  else {
                    Friend.find({
                      idUser: req.body.idUserImg
                    }, (err, user) => {
                      if (err && !user[0]) res.json({err: true, msg: "user 3"})
                      else {
                        user[0].followers.forEach((el) => {
                          if (userSocket[el.id]){
                            userSocket[el.id].emit("likedImg", req.body)}
                        })
                        if (userSocket[req.body.idUserImg]){
                          userSocket[req.body.idUserImg].emit("likedImg", req.body)
      }
                        if (userSocketLike[req.body.idUserImg]) {
                          userSocketLike[req.body.idUserImg].forEach(elem => {
                            userSocket[elem].emit("likedImg", req.body)
                          })
                        }
                        res.json({err: false, data: req.body})
                      }
                    })              
                  }
                })
              } else res.json({err: true, msg: "user 4"})
            }
          })
        } else {
          res.json({err: true, msg: "user 5"})
        }
      
    })

}
