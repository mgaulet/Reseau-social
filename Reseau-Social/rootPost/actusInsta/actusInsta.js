const TokenGenerator = require('uuid-token-generator');
const Friend = require('../../schemaData/friends')
const User = require('../../schemaData/Users')
const UserImage = require('../../schemaData/UserImage')
const Msg = require('../../schemaData/chats')

module.exports = function alex(app, userSocket, userSocketLike, tockenTab) {

  app.post('/firstActu', (req, res) => {
    if ((req.session && req.session.user && req.session.user.id === req.body.myId)){
      
      Friend.find({
        idUser: req.session.user.id
      }, (err, userTF) => {
        if (err || !userTF[0]) res.json({err: true,text: 'y a r FRERE'})
        else
          UserImage.find({
            idUser: [...userTF[0].followed.map(elem => elem.id), req.session.user.id]
          }, (err, userImagE) => {
            if (err) {
              res.json({
                err: true,
                text: 'y a r FRERE'
              })
            } else {
              let tabAll = userTF[0].followed;
  
              tabAll = [...tabAll, {id: req.session.user.id, name: req.session.user.name, lastName: req.session.user.lastName}]
              let tabRT = []
              let i
              tabAll.forEach(elem => {
                userImagE.forEach(elem2 => {
                  if (elem.id === elem2.idUser) {
                    console.log('valiDF');
                    i = {
                      _id: elem2._id,
                      idUser: elem2.idUser,
                      type: elem2.type,
                      content: elem2.content,
                      url: elem2.url,
                      date: elem2.date,
                      name: elem.name,
                      lastName: elem.lastName,
                      like: elem2.like,
                      commentary: elem2.commentary
                    }
                    tabRT = [...tabRT, i]
                  }
                })
              })
              tabRT.sort((el, e) => el.date - e.date)
              tabRT.reverse()
  
              res.json({
                err: false,
                imagesFriends: tabRT,
                text: 'y a r FRERE'
              })
            }
          })
      })
    } else  res.json({
      err: true,
      text: 'y a r FRERE'
    })
  })
}