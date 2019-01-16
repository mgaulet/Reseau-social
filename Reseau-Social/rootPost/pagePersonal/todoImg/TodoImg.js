const fs =  require('fs')
const multer = require('multer');
const path = require('path')
let   secuID = require('../../../middleware/sessionSecu.js')

const TokenGenerator = require('uuid-token-generator');
const Friend = require('../../../schemaData/friends')
const User = require('../../../schemaData/Users')
const UserImage = require('../../../schemaData/UserImage')
const Msg = require('../../../schemaData/chats')

    // Set The Storage Engine
    const storage = multer.diskStorage({
    destination: function(req, file, cb){
      let words = file.originalname.split(" ");
  
      if (req && req.session && req.session.user && words[1] === req.session.user.id) {
        if (secuID(words[1], req.session.user.id))
          words[1] = ''
        else {
            words[1] = './client/public/usersImage/' + words[1]
        }
      } else {
          words[1] = './client/public/cleaner'
      } 
      
      
  
        cb(null, words[1]);
    },
    filename: function(req, file, cb){
      let names = file.originalname.split(" ");
  
      if (req && req.session && req.session.user && names[1] === req.session.user.id) {
        file.originalname = names[0]
        req.file = file
      } else {
        file.originalname = "clean"
        req.file = undefined
      }
      cb(null, file.originalname);
    }
    });
    // Init Upload
    const upload = multer({
    storage: storage,
    limits:{fileSize: 10000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
    }).array('file', 1);
  
    function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
    }



module.exports = function alex(app, userSocket, userSocketLike, tockenTab) {

    app.post('/upload', (req, res) => {

        if (req.session && req.session.user && req.session.user.id) {
        upload(req, res, (err, file) => {
          if (err){
            res.json({
                  error: true,
                  file: file
            })
          } 
            if (req.file == undefined){
                res.json({
                    error: "false",
                    file: req.file
                })
              } else {
              if (req.file.originalname.split('.')[0] !== 'tmp'){
      
                UserImage.find({
                  _id: req.file.originalname.split('.')[0]
                }, (err, user) => {
      
                  if (err || !user[0]) res.json({error: "false",file: req.file})
                  else
                  Friend.find({
                    idUser: user[0].idUser
                  }, (err, userTR) => {
      
                    if (err || !userTR[0]) res.json({error: "false",file: req.file})
                    else {
      
      
                      let i = {
                        _id: user[0]._id,
                        idUser: user[0].idUser,
                        type: user[0].type,
                        content: user[0].content,
                        url: user[0].url,
                        date: user[0].date,
                        name: req.session.user.name,
                        lastName: req.session.user.lastName,
                        like: user[0].like,
                        commentary: user[0].commentary
                      }
      
                      userTR[0].followers.forEach(elem => {
      
                        if (userSocket[elem.id])
                          userSocket[elem.id].emit('eventLiveActu', i)
                      })
                      if (userSocket[req.session.user.id])
                        userSocket[req.session.user.id].emit('eventLiveActu', i)
      
                      res.json({
                        success: true,
                        file: i
                      })
                    }
                  })
                })
              } else
              res.json({
                success: true,
                file: req.file
              })
          }
        });
      } else {
        res.json({
          error: true,
      })
      }
      });

    app.post('/deleteImage', (req, res) => {
        if (req.session && req.session.user && req.session.user.id === req.body.data[0]) {
          UserImage.deleteOne({ _id: req.body.data[1] }, function (err) { 
            if (err) res.json({err: true})
            else {
      
              fs.unlink('./client/public/usersImage/'+ req.session.user.id + '/' + req.body.data[1] + '.png', (err) => {
                  if (err) res.json({err: true});
                  else {
                    Friend.find({
                      idUser: req.session.user.id
                    }, (err, userTR) => {
                      if (err || !userTR[0]) res.json({err: true});
                      else {
                        userTR[0].linkMsg.forEach(elem => {
                          if (userSocket[elem.idFriend])
                            userSocket[elem.idFriend].emit('eventdeleteActuImg', req.body.data[1])
                        })
                        if (userSocket[req.session.user.id]) {
                          userSocket[req.session.user.id].emit('eventdeleteActuImg', req.body.data[1])
                        }
                        res.json({err: false, id: req.body.data[1]})
                      }
                    })
                  }
                });
            }
          });
        } else res.json({ err: true })
    })

}
