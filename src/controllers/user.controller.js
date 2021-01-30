//Dependencias
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const ShoppingCart = require('../models/ShoppingCart');

//Funciones
async function registerUsuario(req, res){

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    await User.create({
        
        email : req.body.email,
        password : hashedPassword,
        name : req.body.name,
        surname : req.body.surname,
        cc : req.body.cc,
        address : req.body.address,
        addressComplement : req.body.addressComplement,
        country : req.body.country,
        city : req.body.city,
        phoneNumber : req.body.phoneNumber,
        wishList:[]
    },
    async function(err, user){
        if(err) return res.status(500).send('Hubo un problema con el registro.')

        //Se crea el carrito de compras

        const newShoppingCart = {
            userId:user._id,
            products:[]
        }

        const shoppingCart = new ShoppingCart(newShoppingCart);
        await shoppingCart.save();

        //Se crea el token
        const token = jwt.sign({id:user._id}, process.env.SECRET_KEY,{
            expiresIn: 86400 //Vence en 24 horas
        });
        res.status(200).send({auth:true, token: token});
    });
}

async function loginUsuario(req, res){
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


async function getUsuarioLogued(req, res, next){
    
    //res.status(200).send(decoded);
    User.findById(req.userId, {password: 0}, function(err, user){
        if (err) return res.status(500).send("Hubo un problema encontrando al usuario");
        if (!user) return res.status(404).send("No se encontró al usuario");

        res.status(200).send(user);
    });
}

async function getUsuario(req, res){
    const {id} = req.params;
    User.findById(id, {password: 0}, function(err, user){
        if (err) return res.status(500).send("Hubo un problema encontrando al usuario");
        if (!user) return res.status(404).send("No se encontró al usuario");

        res.status(200).send(user);
    });
}

//Exportaciones
module.exports = {
    loginUsuario,
    registerUsuario,
    getUsuarioLogued,
    getUsuario
}