const { Schema, model } = require('mongoose');

const opinionSchema = new Schema({
    usuarioId:String,
    productoId:String,
    calificacion:Number,
    titulo:String,
    opinionUsuario:String
},{
    timestamps: true
});

module.exports = model('Opinion', opinionSchema);