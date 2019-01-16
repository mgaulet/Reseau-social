let app1 = require("./app/App")
let input = require("./utils/input")
let todoFriends = require("./todoFriends/todoFriends")
let actusInsta = require("./actusInsta/actusInsta")
let personal = require('./pagePersonal/Personal.js')
let personalFriend = require('./pageFriend/Personal.js')
let like = require("./like/like.js")
let insta = require("./insta/insta.js")
let fluxTabMsgStores = require("./fluxTabMsgStores/fluxTabMsgStores.js")
let fluxNotifStores = require("./fluxNotifStores/fluxNotifStores.js")
let barRecherche = require("./barRecherche/barRecherche.js")


module.exports = function alex(app, userSocket, userSocketLike, tockenTab) {

    app1(app, userSocket, userSocketLike, tockenTab)
    input(app, userSocket, userSocketLike, tockenTab)
    actusInsta(app, userSocket, userSocketLike, tockenTab)
    todoFriends(app, userSocket, userSocketLike, tockenTab)
    personal(app, userSocket, userSocketLike, tockenTab)
    personalFriend(app, userSocket, userSocketLike, tockenTab)
    like(app, userSocket, userSocketLike, tockenTab)
    insta(app, userSocket, userSocketLike, tockenTab)
    barRecherche(app, userSocket, userSocketLike, tockenTab)
    fluxNotifStores(app, userSocket, userSocketLike, tockenTab)
    fluxTabMsgStores(app, userSocket, userSocketLike, tockenTab)

}
