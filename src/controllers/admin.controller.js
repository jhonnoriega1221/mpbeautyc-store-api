//Dependencias
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

//Funciones
async function registerAdmin(req, res){
    const hashedPassword = bcrypt.hashSync(req.body.adminPassword, 8);
    await Admin.create({
        adminName:req.body.adminName,
        adminEmail:req.body.adminEmail,
        adminPassword:hashedPassword,
        isAdmin:req.body.isAdmin
    },
    async function(err, admin){
        if(err) return res.status(500).send('Hubo un problema al registrar al admin');
    
        res.status(200).send('Admin creado, bienvenido, admin');
    });
}

async function loginAdmin(req, res){
        Admin.findOne({adminEmail:req.body.adminEmail},function(err, admin){
        if(err) return res.status(500).send('Error en el servidor.');
        if(!admin) return res.status(404).send('Admin no encontrado');

        const passwordIsValid = bcrypt.compareSync(req.body.adminPassword, admin.adminPassword);
        if(!passwordIsValid) return res.status(401).send('Contraseña incorrecta');

        var token = jwt.sign({id: admin._id, isAdmin: admin.isAdmin}, process.env.SECRET_KEY, {
            expiresIn: 86400
        });

        console.log("When eres admin: Soi admin 😎 pero no el admin de su corazon: 😔");

        return res.status(200).send({auth: true, token:token });
    });
}

async function getAdmin(req, res){
    Admin.findById(req.adminId, {adminPassword: 0}, function(err, admin){
        if (err) return res.status(500).send("Hubo un problema encontrando al admin");
        if (!admin) return res.status(404).send("No eres el admin 😠, IDENTIFICATE!!!");
        
        return res.status(200).send(admin);
    })
}

//Exportaciones
module.exports = {
    registerAdmin,
    loginAdmin,
    getAdmin
}