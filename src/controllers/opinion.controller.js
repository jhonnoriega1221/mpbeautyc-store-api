let Opinion = require('../models/Opinion');

//Crear opinion
const createOpinion = async function createOpinion(req, res){
    const { usuarioId,
            productoId,
            calificacion,
            titulo,
            opinionUsuario
        } = req.body;

        

    const newOpinion = {
        usuarioId,
        productoId,
        calificacion,
        titulo,
        opinionUsuario
        }



    const opinion = new Opinion(newOpinion);
    await opinion.save();

    return res.json({
        message: 'Opinion almacenada',
        opinion
    });
}

//Leer preguntas
const readOpiniones = async function readOpiniones(req, res){
    const opiniones = await Opinion.find().sort({"createdAt": -1});
    return res.json(opiniones);
}

//Consultar las preguntas de un producto especifico
const readOpinionProducto = async function readOpinionProducto(req, res){
	const {id} = req.params;
	const opinion = await Opinion.find({"productoId":id});
	return res.json(opinion);
}

module.exports = {
    createOpinion:createOpinion,
    readOpiniones:readOpiniones,
    readOpinionProducto:readOpinionProducto
}
