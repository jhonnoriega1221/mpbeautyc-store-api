const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Admin = require('../models/Admin');

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

//Logear admin
const loginAdmin = async function loginAdmin(req, res){
    Admin.findOne({adminEmail:req.body.adminEmail},function(err, admin){
        if(err) return res.status(500).send('Error en el servidor.');
        if(!admin) return res.status(404).send('Admin no encontrado');

        const passwordIsValid = bcrypt.compareSync(req.body.adminPassword, admin.adminPassword);
        if(!passwordIsValid) return res.status(401).send({auth: false, token: null});

        var token = jwt.sign({id: admin._id}, process.env.SECRET_KEY, {
            expiresIn: 86400
        });

        console.log("Soi admin 😎");

        res.status(200).send({auth: true, token:token });
    });
}


module.exports = {
    logoutUsuario:logoutUsuario,
    loginUsuario:loginUsuario,
    loginAdmin:loginAdmin
}
