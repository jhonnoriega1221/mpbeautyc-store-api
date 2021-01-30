const { Schema, model } = require('mongoose');
const mongooseHidden = require ('mongoose-hidden')();

const wishListSchema = new Schema({
    productId:String
}, {_id:false})

const userSchema = new Schema({
    email:String,
    password:{type:String, hide: true},
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

userSchema.plugin(mongooseHidden);

module.exports = model('User', userSchema);