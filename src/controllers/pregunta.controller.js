//Dependencias
let Pregunta = require('../models/Pregunta')
const { Types } = require('mongoose');


//Funcions

//Crear pregunta
async function createPregunta(req, res){

    const { preguntaUsuario
        } = req.body;

    console.log(req.params.productoId);

    const newPregunta = {
        usuarioId:Types.ObjectId(req.userId),
        productoId:Types.ObjectId(req.params.productoId),
        preguntaUsuario,
        respuesta:''
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
    const preguntas = await Pregunta.aggregate([
        {
            $lookup:
            {
                from: 'users',
                localField: 'usuarioId',
                foreignField: '_id',
                as: 'userData'
            }
            
        },
        {
            $lookup:
            {
                from: 'productos',
                localField: 'productoId',
                foreignField: '_id',
                as: 'productoData'
            }
        }
    ]);
    return res.json(preguntas);
}

async function readPregunta(req ,res){
    const id = req.params.id;

    const pregunta = await Pregunta.aggregate([
        { $match:{_id:Types.ObjectId(id)}},
        {
            $lookup:
            {
                from: 'users',
                localField: 'usuarioId',
                foreignField: '_id',
                as: 'userData'
            }
            
        },
        {
            $lookup:
            {
                from: 'productos',
                localField: 'productoId',
                foreignField: '_id',
                as: 'productoData'
            }
        }
    ]);

    return res.status(200).send(pregunta)
}

async function responderPregunta(req, res){
    const id = req.params.id;
    const {respuesta} = req.body

    pregunta = await Pregunta.findByIdAndUpdate(id,{
        respuesta
    });

    return res.status(200).send(pregunta);
}

//Consultar las preguntas de un producto especifico
async function readPreguntasProducto(req, res){
	const {productoId} = req.params;
	const pregunta = await Pregunta.find({"productoId":productoId});
	return res.json(pregunta);
}

module.exports = {
    createPregunta,
    readPreguntas,
    readPregunta,
    responderPregunta,
    readPreguntasProducto
}