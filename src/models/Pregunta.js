const { Schema, model } = require('mongoose');

const preguntaSchema = new Schema({
    usuarioId:String,
    productoId:String,
    preguntaUsuario:String,
    respuesta:String
},{
    timestamps: true
});

module.exports = model('Pregunta', preguntaSchema);