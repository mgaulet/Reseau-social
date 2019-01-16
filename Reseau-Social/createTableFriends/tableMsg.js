const Friend = require('../schemaData/friends')

let createFriend = (id, data) => new Promise((resolve, reject) => {
    add = new Friend()

    add.idUser = id
    add.name = data.name
    add.lastName = data.lastName
    add.save((err, user) => {
        if (err) reject(err)
        else {
            resolve(1)
        }
    })
})

module.exports = createFriend