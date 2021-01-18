const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const registerAdmin = async function registerAdmin(req, res){
    const hashedPassword = bcrypt.hashSync(req.body.adminPassword, 8);
    await Admin.create({
        adminName:req.body.adminName,
        adminEmail:req.body.adminEmail,
        adminPassword:hashedPassword
    },
    async function(err, admin){
        if(err) return res.status(500).send('Hubo un problema al registrar al admin');
    
        res.status(200).send('Admin creado, bienvenido, admin');
    });
}

const getAdmin = async function getAdmin(req, res){
    Admin.findById(req.adminId, {password: 0}, function(err, admin){
        if (err) return res.status(500).send("Hubo un problema encontrando al admin");
        if (!admin) return res.status(404).send("No eres el admin 😠, IDENTIFICATE!!!");
        
        res.status(200).send(admin);
    })
}

module.exports = {
    registerAdmin:registerAdmin,
    getAdmin:getAdmin
}