const Router = require('express');
const upload = require('../libs/multer')
const router = Router();

const productoController = require('../controllers/producto.controller');
const preguntaController = require('../controllers/pregunta.controller');
const opinionController = require ('../controllers/opinion.controller');

/*--------------RUTAS PRODUCTO---------------- */
router.route('/producto')
	.get(productoController.readProductos)
	.post(upload.single('image'), productoController.createProducto);

router.route('/producto/:id')
	.get(productoController.readProducto);

router.route('/?busqueda=:query')
	.get(productoController.buscarProducto);

	/*-----------RUTAS PREGUNTAS------------*/
router.route('/pregunta')
	.get(preguntaController.readPreguntas)
	.post(preguntaController.createPregunta);

router.route('/pregunta/:id')
	.get(preguntaController.readPreguntaProd);

	/*------------RUTAS OPINIONES-------------- */

router.route('/opinion')
	.get(opinionController.readOpiniones)
	.post(opinionController.createOpinion);

router.route('/opinion/:id')
	.get(opinionController.readOpinionProd);

module.exports = router;