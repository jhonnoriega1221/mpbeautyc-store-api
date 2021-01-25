//Dependencias
let Pregunta = require('../models/Pregunta')

//Funcions

//Crear pregunta
async function createPregunta(req, res){
    const { usuarioId,
            productoId,
            preguntaUsuario,
            respuesta =''
        } = req.body;

    const newPregunta = {
        usuarioId,
        productoId,
        preguntaUsuario,
        respuesta
        }

    const pregunta = new Pregunta(newPregunta);
    await pregunta.save();

    return res.json({
        message: 'Pregunta almacenada',
        pregunta
    });
}

//Leer preguntas
async function readPreguntas(req, res){
    const preguntas = await Pregunta.find().sort({"createdAt": -1});
    return res.json(preguntas);
}

//Consultar las preguntas de un producto especifico
async function readPreguntasProducto(req, res){
	const {id} = req.params;
	const pregunta = await Pregunta.find({"productoId":id});
	return res.json(pregunta);
}

module.exports = {
    createPregunta,
    readPreguntas,
    readPreguntasProducto
}