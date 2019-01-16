const TokenGenerator = require('uuid-token-generator');
const Friend = require('../../schemaData/friends')
const User = require('../../schemaData/Users')
const UserImage = require('../../schemaData/UserImage')
const Msg = require('../../schemaData/chats')

module.exports = function alex(app, userSocket, userSocketLike, tockenTab) {

    app.post('/ConfirmeFriend', (req, res) => {

        if (req.session && req.session.user && req.session.user.id === req.body.myId) {
      
        Friend.find({
          idUser: req.body.idFriend
        }, (err, userToFollow) => {
          if (err) res.json({err: true})
          else {
              let idLinkMsg = null
              if (userToFollow[0].linkMsg.filter(word => word.idFriend === req.body.myId)[0] === undefined) {
      
                let linkMsg = new Msg()
                linkMsg.save((err, msg) => {
                  if (err) res.json({err: true})
                  else {
                    idLinkMsg = msg._id
      
                    userToFollow[0].followed.push({
                      id: req.body.myId,
                      name: req.session.user.name,
                      lastName: req.session.user.lastName
                    })
            
                    console.log("Id LIEN msg ",idLinkMsg)
                    if (idLinkMsg)
                      userToFollow[0].linkMsg.push({
                        idFriend: req.body.myId,
                        idLien: idLinkMsg
                    })
      
                    userToFollow[0].save((err, userToFollows) => {
      
                      if (err) res.json({err: true})
                      else {
            
                        Friend.find({
                          idUser: req.body.myId
                        }, (err, my) => {
                          if (err) res.json({err: true})
                          else {
                            my[0].followers.push({ ///// modifier avec les new dans la base de donner
                              id: userToFollow[0].idUser,
                              name: userToFollow[0].name,
                              lastName: userToFollow[0].lastName
                            })
            
                            if (idLinkMsg)
                              my[0].linkMsg.push({
                                idFriend: userToFollow[0].idUser,
                                idLien: idLinkMsg
                            })
      
                            let t = my[0].reqFriends.filter(fr => fr.id !== userToFollow[0].idUser)
                            my[0].reqFriends = t
      
                            my[0].save((err, myUser) => {
                              if (err) res.json({err: true})
                              if (userSocket[req.body.idFriend] !== undefined){
                                
                                userSocket[req.body.idFriend].emit('eventFollowFront', req.body.myId, {id: myUser.idUser ,name: myUser.name, lastName: myUser.lastName}, 2)}
                              
                              if (userSocketLike[req.body.myId]) 
                                userSocketLike[req.body.myId] = userSocketLike[req.body.myId].filter(elem => elem !== req.body.idFriend)
      
                              res.json({
                                err: false,
                                msg: {id: userToFollows.idUser ,name: userToFollows.name, lastName: userToFollows.lastName}
                              })
                            })
                          }
            
                        })
                      }
                    })
                  }
                })
              } else {
      
                    userToFollow[0].followed.push({
                      id: req.body.myId,
                      name: req.session.user.name,
                      lastName: req.session.user.lastName
                    })
      
                    userToFollow[0].save((err, userToFollows) => {
      
                      if (err) res.json({err: true})
                      else {
            
                        Friend.find({
                          idUser: req.body.myId
                        }, (err, my) => {
                          if (err) res.json({err: true})
                          else {
                            my[0].followers.push({ ///// modifier avec les new dans la base de donner
                              id: userToFollow[0].idUser,
                              name: userToFollow[0].name,
                              lastName: userToFollow[0].lastName
                            })
      
                            let t = my[0].reqFriends.filter(fr => fr.id !== userToFollow[0].idUser)
                            my[0].reqFriends = t
      
                            my[0].save((err, myUser) => {
                              if (err) res.json({err: true})
                              if (userSocket[req.body.idFriend] !== undefined) {
                                console.log('je passe tutu 2');
                                userSocket[req.body.idFriend].emit('eventFollowFront', req.body.myId, {id: myUser.idUser ,name: myUser.name, lastName: myUser.lastName}, 2)}
                          
                                if (userSocketLike[req.body.myId]) 
                                userSocketLike[req.body.myId] = userSocketLike[req.body.myId].filter(elem => elem !== req.body.idFriend)
      
                              res.json({
                                err: false,
                                msg: {id: userToFollows.idUser ,name: userToFollows.name, lastName: userToFollows.lastName}
                              })
                            })
                          }
            
                        })
                      }
                    })
              }
            
          }
        })
      } else res.json({err: true})
    })

    app.post('/confirmeAnnule', (req, res) => { ///// ATENTION verifier la req.session //////
  
        if (req.session && req.session.user && req.session.user.id === req.body.myId) {
      
        Friend.find({
          idUser: req.body.myId
        }, (err, user) => {
          if (err) res.json({err: true})
          else {
            user[0].req
            let t = user[0].reqFriends.filter(fr => fr.id !== req.body.idFriend)
            user[0].reqFriends = t
            user[0].save((err, myUser) => {
              if (err) res.json({err: true})
              else res.json({err: false})
            })
          }
        }) 
      } else res.json({err: true})
    })
      
}
