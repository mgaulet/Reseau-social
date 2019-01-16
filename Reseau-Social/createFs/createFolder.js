const fs =  require('fs')
const User = require('../schemaData/Users')




let creatFolder = email => new Promise((resolve, reject) => {
    User.find({
        email: email
      }, (err, user) => {
        if (err)
            reject(user[0]._id)
        else {
            fs.mkdir('./client/public/usersImage/' + user[0]._id, { recursive: true }, (err) => {
                if (err) reject(err);
                fs.copyFile('./client/public/icon/imgProfil.png', './client/public/usersImage/'+ user[0]._id +'/imgProfil.png', (err) => {
                    if (err) reject(err);
                    resolve(user[0]._id)
                  });
            });
        }
      })
})

module.exports = creatFolder