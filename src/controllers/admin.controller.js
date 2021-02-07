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
        isAdmin:true
    },
    async function(err, admin){
        if(err) return res.status(500).send('Hubo un problema al registrar al admin');
return res.json({
        message: 'Admin creado'
    });
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

async function getAdminLogued(req, res){
    Admin.findById(req.adminId, {adminPassword: 0}, function(err, admin){
        if (err) return res.status(500).send("Hubo un problema encontrando al admin");
        if (!admin) return res.status(404).send("No eres el admin 😠, IDENTIFICATE!!!");
        
        return res.status(200).send(admin);
    })
}

async function getAdmins(req, res){
    const admins = await Admin.find({});
    return res.status(200).send(admins);
}

async function getAdmin(req, res){
    const {id} = req.params;
    const admin = await Admin.findById(id);

    return res.status(200).send(admin);
}

async function updateAdmin(req, res){
    const {id} = req.params;
    const{
        adminName,
        adminEmail
    } = req.body


    const updatedAdmin = await Admin.findByIdAndUpdate(id,{
        adminName,
        adminEmail
        },{new:true});
        return res.json({
            message: 'Admin actualizado',
            updatedAdmin
        });
    
}

async function deleteAdmin(req, res){
    const { id } = req.params;

    const deletedAdmin = await Admin.findByIdAndDelete(id);

    return res.json({
        message: 'Admin eliminado'
    });
}

//Exportaciones
module.exports = {
    registerAdmin,
    loginAdmin,
    getAdminLogued,
    getAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin
}