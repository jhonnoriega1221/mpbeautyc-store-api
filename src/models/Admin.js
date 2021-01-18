const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    adminName:String,
    adminEmail:String,
    adminPassword:String
});

module.exports = model('Admin', adminSchema);

