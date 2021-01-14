const { Schema, model } = require('mongoose');

const wishListSchema = new Schema({
    productId:String
}, {_id:false})

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
    phoneNumber:Number,
    wishList:[wishListSchema]
});

module.exports = model('User', userSchema);