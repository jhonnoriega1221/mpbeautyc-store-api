const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const ShoppingCart = require('../models/ShoppingCart');
const shoppingCartController = require('./shoppingCart.controller');


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

const getUsuario = async function getUsuario(req, res, next){
    
    //res.status(200).send(decoded);
    User.findById(req.userId, {password: 0}, function(err, user){
        if (err) return res.status(500).send("Hubo un problema encontrando al usuario");
        if (!user) return res.status(404).send("No se encontró al usuario");

        res.status(200).send(user);
    });
}

module.exports = {
    registerUsuario:registerUsuario,
    getUsuario:getUsuario
}