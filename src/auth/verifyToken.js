const jwt = require('jsonwebtoken');

function verifyUserToken(req, res, next){
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

function verifyAdminToken(req, res, next){
    var token = req.headers['x-access-token'];
    if(!token)
        return res.status(403).send({auth: false, message: 'No hay token.'});

    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
        if(err)
        return res.status(500).send({auth: false, message: 'Datos incorrectos 😡'});
        if(!decoded.isAdmin)
        return res.status(500).send({auth: false, message: 'Usted no es el admin, IDENTIFIQUESE!!! 😡'})

        req.adminId = decoded.id;
        next();
    });
}

module.exports = {
    verifyUserToken:verifyUserToken,
    verifyAdminToken:verifyAdminToken
};