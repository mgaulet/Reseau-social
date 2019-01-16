const TokenGenerator = require('uuid-token-generator');
const Friend = require('../../schemaData/friends')
const User = require('../../schemaData/Users')
const UserImage = require('../../schemaData/UserImage')
const Msg = require('../../schemaData/chats')

module.exports = function alex(app, userSocket, userSocketLike, tockenTab) {

    app.post('/inputCommentary', (req, res) => {
        if ((req.session && req.session.user && req.session.user.id === req.body.myId)){
          UserImage.find({
            _id: req.body.idImg
          }, (err, img) => {
            if (err || !img[0]) res.json({err: true, msg: "user 1"})
            else {
              img[0].commentary.push(req.body.text)
                img[0].save((err) => {
                  if (err) res.json({err: true, msg: "user 2"})
                  else {
                    Friend.find({
                      idUser: req.body.idUserImg
                    }, (err, user) => {
                      if (err && !user[0]) {
                        console.log('ree user{]');
                        
                        res.json({err: true, msg: "user 3"})}
                      else {
                        console.log('true ici');
                        
                        user[0].followers.forEach((el) => {
                          if (userSocket[el.id])
                            userSocket[el.id].emit("commentarySocket", req.body.idImg, req.body.text)
                        })
                        if (userSocket[req.body.idUserImg])
                          userSocket[req.body.idUserImg].emit("commentarySocket", req.body.idImg, req.body.text)
      console.log(req.body.idUserImg);
      
                        if (userSocketLike[req.body.idUserImg]) {
                          console.log('je passe userSocketLike');
                          
                          userSocketLike[req.body.idUserImg].forEach(elem => {
                            console.log(elem)
                            userSocket[elem].emit("commentarySocket", req.body.idImg, req.body.text)
                          })
                        }
                        res.json({err: false, data: req.body})
                      }
                    })              
                  }
                })
            }
          })
        } else {
          res.json({err: true, msg: "user 5"})
        }
      
      })
}
