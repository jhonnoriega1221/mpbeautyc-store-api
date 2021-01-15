const Router = require('express');
const upload = require('../libs/multer')
const router = Router();


const productoController = require('../controllers/producto.controller');
const preguntaController = require('../controllers/pregunta.controller');
const opinionController = require ('../controllers/opinion.controller');
const authController = require('../auth/auth.controller');
const shoppingCartController = require ('../controllers/shoppingCart.controller');
const wishListController = require ('../controllers/wishlist.controller');
const verifyToken = require('../auth/verifyToken');
const userController = require('../controllers/user.controller');

/*----------------RUTAS AUTH----------------------*/


router.route('/auth/login')
	.post(authController.loginUsuario);

router.route('/auth/logout')
	.get(authController.logoutUsuario);

/*--------------RUTAS USUARIO---------------- */

router.route('/user')
	.get(verifyToken, userController.getUsuario);

router.route('/user/signup')
	.post(userController.registerUsuario);

/*-----------------RUTAS PRODUCTO------------------- */
router.route('/producto') //Todos los productos de la base de datos
	.get(productoController.readProductos)
	.post(upload.single('image'), productoController.createProducto); //Crear producto

router.route('/producto/:id') //Un producto en especifico
	.get(productoController.readProducto);

router.route('/?busqueda=:query') //Resultados de busqueda de productos
	.get(productoController.buscarProducto);

	/*-----------RUTAS PREGUNTAS------------*/
router.route('/pregunta')
	.get(preguntaController.readPreguntas)
	.post(preguntaController.createPregunta);

router.route('/pregunta/:id') //Preguntas de un producto en especifico
	.get(preguntaController.readPreguntaProd);

	/*------------RUTAS OPINIONES-------------- */

router.route('/opinion')
	.get(opinionController.readOpiniones) //
	.post(opinionController.createOpinion);

router.route('/opinion/:id') //Opiniones de un producto en especifico
	.get(opinionController.readOpinionProd);

	/*-------------RUTAS CARRITO DE COMPRAS------------------ */
router.route('/shoppingcart')
	.get(verifyToken, shoppingCartController.readShoppingCart)
	.put(verifyToken, shoppingCartController.updateShoppingCart);

router.route('/shoppingcart/:productId')	
	.delete(verifyToken, shoppingCartController.deleteShoppingCartItem);

	/*--------------------RUTAS LISTA DE FAVORITOS--------------------- */
router.route('/wishlist')
	.put(verifyToken, wishListController.updateWishList)
	.get(verifyToken, wishListController.getUserWishList);

router.route('/wishlist/:productId')
	.delete(verifyToken, wishListController.deleteWishListItem);

module.exports = router;