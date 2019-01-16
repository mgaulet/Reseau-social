const TokenGenerator = require('uuid-token-generator');
const Friend = require('../../schemaData/friends')
const User = require('../../schemaData/Users')
const UserImage = require('../../schemaData/UserImage')
const Msg = require('../../schemaData/chats')

module.exports = function alex(app, userSocket, userSocketLike, tockenTab) {

    app.post('/imageFriend2', (req, res) => {
      
        if (!(req.session && req.session.user && req.session.user.id === req.body.myId)) {                               // !!!!!!! WWWWAAAARNIIIINNNNGG  !!!!!!!!!
          res.json({
            err: true,
            text: 'ici1'
          })
        } else {
          Friend.find({
            idUser: req.body.data
          }, (err, frd) => {
            if (err) {
              res.json({
                err: true,
                text: 'ici010'
              })
            } else {
              if (!frd[0].private || (frd[0].followers.find((ellement) => {return ellement.id === req.session.user.id}) != undefined)) {  ///// verifie si le compte et en privee \\\\\
      
                UserImage.find({
                  idUser: req.body.data
                }, (err, userImage) => {
                  if (err) {
                      res.json({
                        err: true,
                        text: 'ici2'
                    })
                  }
      
                  //////////////////  REQ USER FOR IMG   /////////////////////////
      
                  User.find({
                    _id: req.body.data
                  }, (err, user) => {
                    if (err) {
                      res.json({err: true, text: 'ici8'})
                    }
                    if (user[0]){
                      let userd = {name: user[0].name, lastName: user[0].lastName, email: user[0].email, _id: user[0]._id, followers: frd[0].followers.length, followed: frd[0].followed.length, nbImg: userImage.length}
            
            // ^^^^^^^^^^^^ ALGO ^^^^^^^^^^^^^^^^^
      
                      let gg= []
                      let nb = 3
                      let nbIstence = 0
                      let users = userImage.reverse()
                
                      users.forEach((element, index) => {
                          if (index >= (nbIstence) && (index <= ((nbIstence-1) + nb)))
                              gg.push(element)
                        });
            // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                      res.json({
                        err: false,
                        data: gg,
                        friend: userd
                      })
                    }
                    else {
                      res.json({
                        err: true,
                        text: 'ici3'
                      })
                    }
                  })
                  ////////////////////////////
                })
              } else {
      
                User.find({
                  _id: req.body.data
                }, (err, user) => {
                  if (err) {
                    res.json({
                      err: true,
                      text: 'ici6'
                    })
                  }
                  else if (user[0]) {
                  UserImage.find({
                    idUser: req.body.data
                  }, (err, userImage) => {
                    if (err) {
                    res.json({
                      err: true,
                      text: 'ici5'
                    })}
                    let userd = {name: user[0].name, lastName: user[0].lastName, email: user[0].email, _id: user[0]._id, followers: frd[0].followers.length, followed: frd[0].followed.length, nbImg: userImage.length}
      
      
                    res.json({
                      err: false,
                      data: [],
                      friend: userd
                    })
                  })
                  } else {
                    res.json({
                      err: true,
                      text: 'ici5'
                    })
                  }
                })
              }
            }
          })
        }
      });
}
