const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const User = require('../models/User');

//Registrar usuario

const registerUsuario = async function registerUsuario(req, res){
    /*
    const {
        email,
        password
    } = req.body;

    const newUser = {
        email,
        password
    }

    const user = new User(newUser);
    await user.save();

    return res.json({
        message: 'Usuario almacenado',
        user
    });*/

    

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
        email : req.body.email,
        password : hashedPassword,
        name : req.body.password,
        surname : req.body.surname,
        cc : req.body.cc,
        address : req.body.address,
        addressComplement : req.body.addressComplement,
        country : req.body.country,
        city : req.body.city,
        phoneNumber : req.body.phoneNumber
    },
    function(err, user){
        if(err) return res.status(500).send('Hubo un problema con el registro.')
        //Se crea el token
        const token = jwt.sign({id:user._id}, process.env.SECRET_KEY,{
            expiresIn: 86400 //Vence en 24 horas
        });
        res.status(200).send({auth:true, token: token});
    });
}

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

const getProfileUsuario = async function getProfileUsuario(req, res, next){
    
        //res.status(200).send(decoded);
        User.findById(req.userId, {password: 0}, function(err, user){
            if (err) return res.status(500).send("Hubo un problema encontrando al usuario");
            if (!user) return res.status(404).send("No se encontró al usuario");

            res.status(200).send(user);
        });
}

module.exports = {
    registerUsuario:registerUsuario,
    getProfileUsuario:getProfileUsuario,
    logoutUsuario:logoutUsuario,
    loginUsuario:loginUsuario
}
