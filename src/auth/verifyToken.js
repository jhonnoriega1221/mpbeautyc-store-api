const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    var token = req.headers['x-access-token'];
    if(!token)
        return res.status(403).send({auth: false, message: 'No hay token.'});

    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
        if(err)
        return res.status(500).send({auth: false, message: 'Autenticacion fallida'});

        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;