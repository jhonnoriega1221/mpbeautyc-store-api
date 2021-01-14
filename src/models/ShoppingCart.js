const { Schema, model } = require('mongoose');

const shoppingCartItemSchema = new Schema({
    productId:String,
    quantity:Number
}, {_id:false});

const shoppingCartSchema = new Schema({
    userId:String,
    products:[shoppingCartItemSchema]
});

module.exports = model('ShoppingCart', shoppingCartSchema);