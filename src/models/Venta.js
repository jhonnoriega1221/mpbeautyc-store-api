const { Schema, model } = require('mongoose');

const ventaItemSchema = new Schema({
    productId:String
}, {_id:false})

const ventaSchema = new Schema({
    idPedido:Schema.Types.ObjectId()
});

module.exports = model('Venta', ventaSchema);