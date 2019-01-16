const TokenGenerator = require('uuid-token-generator');
const Friend = require('../../schemaData/friends')
const User = require('../../schemaData/Users')
const UserImage = require('../../schemaData/UserImage')
const Msg = require('../../schemaData/chats')

module.exports = function alex(app, userSocket, userSocketLike, tockenTab) {

    app.post('/getAllMsg', (req, res) => {

        if (req.session && req.session.user && req.session.user.id === req.body.myId) {
          Friend.find({
            idUser: req.body.myId
          }, (err, user) => {
            if (err) res.json({err: true})
            else {
              if (user[0] && user[0].linkMsg.find((obj) => obj.idFriend === req.body.idF)) {
                let idLien = user[0].linkMsg.find((obj) => obj.idFriend === req.body.idF).idLien
                Msg.find({
                  _id: idLien
                }, (err, msg) => {
                  if (err) res.json({err: true, tab: "bizzarre"})
                  else {
                    if (msg[0]) res.json({err: false, tab: msg[0].msg})
                    else res.json({err: true, tab: "il n y a pas Msg troucer"})
                  }
                })
              } else res.json({err: true, tab: "il n y a pas linkMsg"})
            }
          })
        } else res.json({ err: true })
      
      })
    
    app.post('/pushMsgForFriend', (req, res) => {
  
    if (req.session && req.session.user && req.session.user.id === req.body.myId) {
      Friend.find({
        idUser: req.body.myId
      }, (err, user) => {
        if (err) res.json({err: true})
        else {
          if (user[0] && user[0].linkMsg.find((obj) => obj.idFriend === req.body.idF)) {
            let idLien = user[0].linkMsg.find((obj) => obj.idFriend === req.body.idF).idLien
            Msg.find({
              _id: idLien
            }, (err, msg) => {
              if (err) res.json({err: true})
              else {
                if (msg[0]) {
  
                  msg[0].msg.push({msg: req.body.text, emmeter: req.session.user.id})
                  msg[0].save((err, us) => {
                    if (err) res.json({err: true})
                    else {
                      if (userSocket[req.body.idF]) userSocket[req.body.idF].emit('eventMsgFriend', req.session.user.id, req.body.text)
                      res.json({err: false})
                    }
                  })
                }
                else res.json({err: true})
              }
            })
          } else res.json({err: true})
        }
      })
    } else res.json({ err: true })
    })
  
}



 
  