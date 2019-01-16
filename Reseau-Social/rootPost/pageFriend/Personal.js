const TokenGenerator = require('uuid-token-generator');
const Friend = require('../../schemaData/friends')
const User = require('../../schemaData/Users')
const UserImage = require('../../schemaData/UserImage')
const Msg = require('../../schemaData/chats')

module.exports = function alex(app, userSocket, userSocketLike, tockenTab) {


          app.post("/likeNoFriends", (req, res) => {
console.log('1');

            if (req.session && req.session.user && req.session.user.id === req.body.myId && req.body.myId != req.body.id) {
console.log('2');

              Friend.find({
                idUser: req.body.id
              }, (err, frd) => {
                  if (err || !frd[0] || frd[0].followers.find(elem => elem.id === req.body.myId)) {
                    // if (!frd[0]) console.log("frd false");
console.log('3');

                    res.json({ err: true})
                  } else {
                    console.log('4');

                    if (!userSocketLike[req.body.id]) userSocketLike[req.body.id] = [req.body.myId]
                    else {

                      if (!userSocketLike[req.body.id].find(el => el === req.body.myId))
                        userSocketLike[req.body.id].push(req.body.myId)
                    }
                    console.log( "id :"+req.body.id + "myid :"+req.body.myId, );
                    console.log(userSocketLike);
                    
                    res.json({
                      err: false
                    })
                  }
              })
        } else {
          res.json({
            err: true
          })
        }
    })

    app.post("/likeNoFriendsDelete", (req, res) => {
        if (req.session && req.session.user && req.session.user.id === req.body.myId) {

          if (userSocketLike[req.body.id]) 
          userSocketLike[req.body.id] = userSocketLike[req.body.id].filter(elem => elem !== req.body.myId)
        res.json({
          err: false
        })


        } else
        res.json({
          err: true
        }) 
    })
    
    app.post('/pushOtherI2', (req, res) => {
        console.log("Push other"+ req.body.data)
        if (!(req.session && req.session.user && req.session.user.id === req.body.myId))
          res.json({
            err: true,
            data: []
          })
        else {
          Friend.find({
            idUser: req.body.data
          }, (err, frd) => {
            if (err) {}
            else {
              if (!frd[0].private || (frd[0].followers.find((ellement) => {console.log(ellement); return ellement.id === req.session.user.id}) != undefined)) {
      
                UserImage.find({
                  idUser: req.body.data
                }, (err, user) => {
                  if (err)
                  res.json({
                    err: true,
                    data: []
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
          } else {
            res.json({
              err: false,
              data: []
            })
          }
        }})
        
        }
    });

    app.post('/reqFollow', (req, res) => { ///// ATENTION verifier la req.session //////

        if (req.session && req.session.user && req.session.user.id === req.body.id && req.body.id !== req.body.idSocket) {
        Friend.find({
          idUser: req.body.idSocket
        }, (err, userToFollow) => {
          if (err) res.json({err: true})
          else {
      
            if (!userToFollow[0].private) {
      
              if (userToFollow[0].followers.filter(word => word.id === req.body.id)[0] === undefined) {
                let idLinkMsg = null
                if (userToFollow[0].linkMsg.filter(word => word.idFriend === req.body.id)[0] === undefined) {
      
                  let linkMsg = new Msg()
                  linkMsg.save((err, msg) => {
                    if (err) res.json({err: true})
                    else {
                      idLinkMsg = msg._id
      
                      userToFollow[0].followers.push({
                        id: req.body.id,
                        name: req.session.user.name,
                        lastName: req.session.user.lastName
                      })
              
                      if (idLinkMsg)
                        userToFollow[0].linkMsg.push({
                          idFriend: req.body.id,
                          idLien: idLinkMsg
                      })
      
                      userToFollow[0].save((err, userToFollows) => {
      
                        if (err) res.json({err: true})
                        else {
                          Friend.find({
                            idUser: req.body.id
                          }, (err, my) => {
                            if (err) res.json({err: true})
                            else {
                              my[0].followed.push({ ///// modifier avec les new dans la base de donner
                                id: userToFollow[0].idUser,
                                name: userToFollow[0].name,
                                lastName: userToFollow[0].lastName
                              })
              
                              console.log("Id LIEN msg ",idLinkMsg)
                              if (idLinkMsg)
                                my[0].linkMsg.push({
                                  idFriend: userToFollow[0].idUser,
                                  idLien: idLinkMsg
                              })
              
                              my[0].save((err, myUser) => {
                                if (err) res.json({err: true})
                                if (userSocket[req.body.idSocket] !== undefined) userSocket[req.body.idSocket].emit('eventFollowFront', req.body.id, {id: myUser.idUser ,name: myUser.name, lastName: myUser.lastName}, 0)
      
                                if (userSocketLike[req.body.idSocket]) { 
                                  userSocketLike[req.body.idSocket] = userSocketLike[req.body.idSocket].filter(elem => elem !== req.body.id)
                                }
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
      
                      userToFollow[0].followers.push({
                        id: req.body.id,
                        name: req.session.user.name,
                        lastName: req.session.user.lastName
                      })
      
                      userToFollow[0].save((err, userToFollows) => {
      
                        if (err) res.json({err: true})
                        else {
              
                          Friend.find({
                            idUser: req.body.id
                          }, (err, my) => {
                            if (err) res.json({err: true})
                            else {
                              my[0].followed.push({ ///// modifier avec les new dans la base de donner
                                id: userToFollow[0].idUser,
                                name: userToFollow[0].name,
                                lastName: userToFollow[0].lastName
                              })
      
                              my[0].save((err, myUser) => {
                                if (err) res.json({err: true})
                                if (userSocket[req.body.idSocket] !== undefined) userSocket[req.body.idSocket].emit('eventFollowFront', req.body.id, {id: myUser.idUser ,name: myUser.name, lastName: myUser.lastName}, 0)
      
                                if (userSocketLike[req.body.idSocket]) { 
                                  userSocketLike[req.body.idSocket] = userSocketLike[req.body.idSocket].filter(elem => elem !== req.body.id)
                                }
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
      
            } else { ////// renvoyer une err vous etes deja amie //////
              res.json({err: true, msg: "vous etes deja Amies"})
            }
            } else { ////// faire la demande ext extera... //////
              Friend.find({
                idUser: req.body.idSocket
              }, (err, userFriend) => {
                if (err || (userFriend[0].reqFriends.find(user => user.id === req.session.user.id) !== undefined) || (userFriend[0].followers.find(user => user.id === req.session.user.id) !== undefined)) res.json({err: true})
                else {
                  if (userFriend[0] && (userFriend[0].reqFriends.find(user => user.id === req.session.user.id) === undefined)) {
                    let info = {
                      id: req.session.user.id,
                      name: req.session.user.name,
                      lastName: req.session.user.lastName,
                      type: "req"
                    }
                    userFriend[0].reqFriends.push(info)
      
                    userFriend[0].save((err, myUser) => {
                      if (err) res.json({err: true})
      
                      else {
                        if (userSocket[req.body.idSocket]) {
                          userSocket[req.body.idSocket].emit('eventNotif', info)
                        }
      
                        res.json({
                          err: false,
                        })
                      }
                    })
      
      
                  } else res.json({err: true})
                }
              })
            }
          }
        })
      } else res.json({err: true})
    })
    
    app.post('/sDesabonner', (req, res) => {

        if (req.session && req.session.user && req.session.user.id === req.body.id && req.body.id !== req.body.idFriend) {
          Friend.find({
            idUser: req.body.idFriend
          }, (err, friend) => {
      
            let tabAll = [...friend[0].followers, ...friend[0].followed].filter(obj => req.body.id === obj.id)
      
            if (tabAll.length > 0) {
      
            let newTab = friend[0].followers.filter(obj => req.body.id !== obj.id)
      
              friend[0].followers = newTab
      
            if (tabAll.length === 1) {
      
              let linkMsgFriend = friend[0].linkMsg.filter(obj => req.body.id === obj.idFriend)
              let newTabLinkMsg = friend[0].linkMsg.filter(obj => req.body.id !== obj.idFriend)
              friend[0].linkMsg = newTabLinkMsg
      
              Msg.findOneAndDelete({_id: linkMsgFriend[0].idLien}, (err) => {
                if (err)
                res.json({
                  err: true
                })
                else {
                  friend[0].save((err) => {
                    if (err)
                    res.json({
                      err: true
                    })
                    else
                    Friend.find({
                      idUser: req.body.id
                    }, (err, myAcount) => {
                      let newTab = myAcount[0].followed.filter(obj => req.body.idFriend !== obj.id)
                      myAcount[0].followed = newTab
                      let newTabLinkMsg = myAcount[0].linkMsg.filter(obj => req.body.idFriend !== obj.idFriend)
                      myAcount[0].linkMsg = newTabLinkMsg
                      myAcount[0].save((err) => {
                        if (err)
                          res.json({
                            err: true
                          })
                        else {
                          if (userSocket[req.body.idFriend] !== undefined)
                            userSocket[req.body.idFriend].emit('eventDes', req.session.user.id)
      
                          if (!userSocketLike[req.body.idFriend]) userSocketLike[req.body.idFriend] = [req.body.id]
                          else {
                            if (!userSocketLike[req.body.idFriend].find(el => el === req.body.id))
                              userSocketLike[req.body.idFriend].push(req.body.id)
                          }
                          res.json({
                            err: false,
                          })
                        }
                      })
                    })
                  })
                }
              })
      } else {
      
        friend[0].save((err) => {
          if (err)
          res.json({
            err: true
          })
          else
          Friend.find({
            idUser: req.body.id
          }, (err, myAcount) => {
            if (err)
              res.json({
                err: true
              }) 
            else {
                  let newTab = myAcount[0].followed.filter(obj => req.body.idFriend !== obj.id)
                  myAcount[0].followed = newTab
                  myAcount[0].save((err) => {
                    if (err)
                      res.json({
                        err: true
                      })
                    else {
                      if (userSocket[req.body.idFriend] !== undefined)
                        userSocket[req.body.idFriend].emit('eventDes', req.session.user.id)
      
                        if (!userSocketLike[req.body.idFriend]) userSocketLike[req.body.idFriend] = [req.body.id]
                        else {
                          if (!userSocketLike[req.body.idFriend].find(el => el === req.body.id))
                            userSocketLike[req.body.idFriend].push(req.body.id)
                        }
                      res.json({
                        err: false,
                      })
                  }
                })
              }
          })
        })
      }
          } else res.json({
            err: true,
          })
          })
        } else res.json({ err: true })
    })
}
