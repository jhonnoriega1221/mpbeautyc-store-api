let Pregunta = require('../models/Pregunta')

//Crear pregunta
const createPregunta = async function createPregunta(req, res){
    const { usuarioId,
            productoId,
            preguntaUsuario,
            respuesta
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
const readPreguntas = async function readPreguntas(req, res){
    const preguntas = await Pregunta.find().sort({"createdAt": -1});
    return res.json(preguntas);
}

//Consultar las preguntas de un producto especifico
const readPreguntaProd = async function readPreguntaProd(req, res){
	const {id} = req.params;
	const pregunta = await Pregunta.find({"productoId":id});
	return res.json(pregunta);
}

module.exports = {
    createPregunta:createPregunta,
    readPreguntas:readPreguntas,
    readPreguntaProd:readPreguntaProd
}
