const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    adminName:String,
    adminEmail:String,
    adminPassword:String,
    isAdmin:Boolean
});

module.exports = model('Admin', adminSchema);

