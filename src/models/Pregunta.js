const { Schema, model } = require('mongoose');

const preguntaSchema = new Schema({
    usuarioId: Schema.Types.ObjectId,
    productoId:Schema.Types.ObjectId,
    preguntaUsuario:String,
    respuesta:String
},{
    timestamps: true
});

module.exports = model('Pregunta', preguntaSchema);