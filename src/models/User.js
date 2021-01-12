const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email:String,
    password:String,
    name:String,
    surname:String,
    cc:Number,
    address:String,
    addressComplement:String,
    country:String,
    city:String,
    phoneNumber:Number
});

module.exports = model('User', userSchema);