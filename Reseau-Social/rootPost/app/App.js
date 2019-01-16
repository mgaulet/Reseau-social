const TokenGenerator = require('uuid-token-generator');
const Friend = require('../../schemaData/friends')


module.exports = function alex(app, userSocket, userSocketLike, tockenTab) {

    app.post('/getTodoFriends', (req, res) => {

        if (req.session && req.session.user && req.session.user.id === req.body.id) {
        Friend.find({
            idUser: req.body.id
        }, (err, friend) => {
            if (err) res.json({err: true})
            else {
            res.json({
                err: false,
                follower: friend[0].followers,
                followed: friend[0].followed,
            })
            }
        })
        }else res.json({ err: true })
    
    })

    app.post('/recoSocket', (req, res) => {
        const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
        let tockenT = tokgen.generate()
      
        
        if (req.session && req.session.user && req.session.user.id === req.body.id) {
          tockenTab[req.session.user.id] = tockenT
          res.json({
            err: false,
            tocken: tockenT
          })
        }
        else {
          res.json({
            err: true,
          })
        }
      })

}
