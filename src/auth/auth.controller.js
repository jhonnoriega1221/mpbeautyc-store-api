const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const User = require('../models/User');

//Registrar usuario


const loginUsuario = async function loginUsuario(req, res){
    User.findOne({ email: req.body.email }, function(err, user){
        if(err) return res.status(500).send('Error en el servidor.');
        if(!user) return res.status(404).send('Usuario no encontrado.');

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid) return res.status(401).send({auth: false, token: null});
    
        var token = jwt.sign({ id: user._id}, process.env.SECRET_KEY, {
            expiresIn: 86400
        });

        res.status(200).send({auth: true, token: token});
    });
}

const logoutUsuario = async function logoutUsuario(req, res){
        res.status(200).send({auth: false, token: null});
}


module.exports = {
    logoutUsuario:logoutUsuario,
    loginUsuario:loginUsuario
}
