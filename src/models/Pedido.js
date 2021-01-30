const{ Schema, model, Mongoose } = require('mongoose');

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
    userId: Schema.Types.ObjectId,
    status:String,
    shippingCost:Number,
    productsTotal:Number,
    netTotal: Number,
    products:[pedidoItemSchema]  
},{
    timestamps:true
});

module.exports = model('Pedido', pedidoSchema);