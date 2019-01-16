
module.exports = function(req, id) {
    if (req === id)
        return false
    else
        return true
}