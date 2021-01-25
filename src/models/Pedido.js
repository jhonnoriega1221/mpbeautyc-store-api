const{ Schema, model } = require('mongoose');

const pedidoItemSchema = new Schema({
    productId:String,
    productName:String,
    imgUrl:String,
    oldPrice:Number,
    actualPrice:Number,
    discount:Number,
    quantity:Number,
    totalProduct:Number,
    color:Array
},{
    _id:false
});

const pedidoSchema = new Schema({
    userId:String,
    status:String,
    shippingCost:Number,
    productsTotal:Number,
    netTotal: Number,
    products:[pedidoItemSchema]  
},{
    timestamps:true
});

module.exports = model('Pedido', pedidoSchema);