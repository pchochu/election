const jwt = require('jsonwebtoken')

module.exports = function (req,res,next){
    const token = req.body.headers['token'];
    if(!token) return res.status(401).send('Pristup odmietnuy');

    try{
        const verified = jwt.verify(token, 'isAdmin');
        req.user = verified
        next()
    } catch (error){
        res.status(400).send('Zly')

    }
}