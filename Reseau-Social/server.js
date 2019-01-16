// let app = require('express')();
let express = require('express');
let session = require('express-session')
const TokenGenerator = require('uuid-token-generator');

let app = express()
// socket.io 
const fs =  require('fs')
const path = require('path')
const multer = require('multer');
let server = require('http').createServer(app);
let io = require('socket.io')(server);

/////////// data \\\\\\\\\\\\
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/insta', { useNewUrlParser: true })
const Book = require('./schemaData/books')
const Friend = require('./schemaData/friends')
const User = require('./schemaData/Users')
const UserImage = require('./schemaData/UserImage')
const Msg = require('./schemaData/chats')
/////////// data \\\\\\\\\\\\

let secuID = require('./middleware/sessionSecu.js')


const bodyParser = require('body-parser')
let userSocket = [] // les users connecter au sokect io
let userSocketLike = [] // les users connecter au sokect io

let tockenTab = []


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/client/public"))

app.set('views', __dirname + '/client/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(session({
  secret: 'dwqwd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false}
}))


// require('dns').lookup(require('os').hostname(), function (err, add, fam) {
//   console.log('addr: '+add);
// })



app.get('/', (req, res) => {           // all rout !!!!!!!!!!!!!!!!!!!!!!!!
  res.render(__dirname+'/client/public/index.html')
});

app.get('/register', (req, res) => {           // all rout !!!!!!!!!!!!!!!!!!!!!!!!
  res.render(__dirname+'/client/public/index.html')
});

app.get('/home', (req, res) => {           // all rout !!!!!!!!!!!!!!!!!!!!!!!!
  res.render(__dirname+'/client/public/index.html')
});

app.get('/user', (req, res) => {           // all rout !!!!!!!!!!!!!!!!!!!!!!!!
  res.render(__dirname+'/client/public/index.html')
});

app.get('/friend/:id', (req, res) => {           // all rout !!!!!!!!!!!!!!!!!!!!!!!!
  res.render(__dirname+'/client/public/index.html')
});

  ////||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
 //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//


let allPost = require('./rootPost/All')

allPost(app, userSocket, userSocketLike, tockenTab)

app.post('/', (req, res) => {

  let dataT = req.body.data
  User.find({
    email: dataT.email,
    password: dataT.password
  }, (err, user) => {
    if (err)
      res.json({text: "Server err", err: true})
      
    if (user[0]){
      let userd = {name: user[0].name, lastName: user[0].lastName, email: user[0].email, _id: user[0]._id}
        req.session.user = {name: user[0].name, lastName: user[0].lastName, email: user[0].email, id: user[0]._id, password: user[0].password}

      res.json({user: userd, err: false})
    }
    else
      res.json({text: "Email or Password is not valide", err: true})
  })
})



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



  const createFolder = require("./createFs/createFolder.js")
  const tableMsg = require("./createTableFriends/tableMsg.js")
  const createFile = require("./createFs/createFile.js")

  io.on('connection', function(socket){

    socket.on("verifTocken", (tocken, id) => {
      if (tockenTab[id] === tocken) userSocket[id] = socket
    })

    socket.on('login', (data, cb) => {
      User.find({
        email: data.email,
        password: data.password
      }, (err, user) => {
        if (err) cb(true)
        else if (user[0]) {
          userSocket[user[0]._id] = socket
          cb(false)
        }
        else cb(true)
      })
    })

    socket.on('ValEmail', (data, cb) => {
      User.find({
        email: data.email
      }, (err, user) => {
        if (err)
          cb('error')
        if (user[0])
          cb('existe deja')
        else {
          add = new User()

          add.name = data.name
          add.lastName = data.lastName
          add.email = data.email
          add.password = data.password
          add.save((err, user) => {
            if (err)
              cb(err)
            else {
              createFolder(data.email)
              .then((result) => {
                tableMsg(user._id, data)
                .then((res) => {
                  cb(user)
                })
                .catch((res) => console.log)
                cb(user)
              })
              .catch(result => {
                User.findOneAndDelete({_id: result}, () => {})
              })
            }
          })

        }
      })
    })

    socket.on('searchName', (userId, content, cb) => {
        let add = new UserImage()

        add.idUser = userId
        add.type = ".png"
        add.content = content

        add.save((err, user) => {
          if (err) {}
          else {
            user.url = "/usersImage/" + user.idUser + '/' + user._id + user.type
            user.save((err, users) => {

              cb(users, err)
            })
          }
        })
    })
});

server.listen(8080);


