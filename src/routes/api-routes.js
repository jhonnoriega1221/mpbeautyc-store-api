const Router = require('express');
const upload = require('../libs/multer')
const router = Router();


const productoController = require('../controllers/producto.controller');
const preguntaController = require('../controllers/pregunta.controller');
const opinionController = require ('../controllers/opinion.controller');
const authController = require('../auth/auth.controller');
const shoppingCartController = require ('../controllers/shoppingCart.controller');
const wishListController = require ('../controllers/wishlist.controller');
const pedidoController = require ('../controllers/pedido.controller');
const verifyToken = require('../auth/verifyToken');
const adminController = require('../controllers/admin.controller');
const userController = require('../controllers/user.controller');

/*----------------RUTAS AUTH----------------------*/


router.route('/auth/login')
	.post(authController.loginUsuario);

router.route('/auth/admin/login')
	.post(authController.loginAdmin);

/*--------------RUTAS ADMIN-------------------- */
router.route('/admin')
	.get(verifyToken.verifyAdminToken, adminController.getAdmin)

router.route('/admin/signup')
	.post(verifyToken.verifyAdminToken, adminController.registerAdmin);

/*--------------RUTAS USUARIO---------------- */

router.route('/user')
	.get(verifyToken.verifyUserToken, userController.getUsuario);

router.route('/user/signup')
	.post(userController.registerUsuario);

/*-----------------RUTAS PRODUCTO------------------- */
router.route('/producto') //Todos los productos de la base de datos
	.get(productoController.readProductos)
	.post(verifyToken.verifyAdminToken, upload.single('image'), productoController.createProducto); //Crear producto

router.route('/producto/:id') //Un producto en especifico
	.get(productoController.readProducto)
	.put(verifyToken.verifyAdminToken, productoController.updateProducto)
	.delete(verifyToken.verifyAdminToken, productoController.unsubscribeProducto)
	.post(verifyToken.verifyAdminToken, productoController.subscribeProducto)

router.route('/?busqueda=:query') //Resultados de busqueda de productos
	.get(productoController.buscarProducto);

	/*-----------RUTAS PREGUNTAS------------*/
router.route('/pregunta')
	.get(preguntaController.readPreguntas)
	.post(verifyToken.verifyUserToken, preguntaController.createPregunta);

router.route('/pregunta/:id') //Preguntas de un producto en especifico
	.get(preguntaController.readPreguntaProd);

	/*------------RUTAS OPINIONES-------------- */

router.route('/opinion')
	.get(opinionController.readOpiniones) //
	.post(verifyToken.verifyUserToken, opinionController.createOpinion);

router.route('/opinion/:id') //Opiniones de un producto en especifico
	.get(opinionController.readOpinionProd);

	/*-------------RUTAS CARRITO DE COMPRAS------------------ */
router.route('/shoppingcart')
	.get(verifyToken.verifyUserToken, shoppingCartController.readShoppingCart)
	.put(verifyToken.verifyUserToken, shoppingCartController.updateShoppingCart);

router.route('/shoppingcart/:productId')	
	.delete(verifyToken.verifyUserToken, shoppingCartController.deleteShoppingCartItem);

	/*--------------------RUTAS LISTA DE FAVORITOS--------------------- */
router.route('/wishlist')
	.put(verifyToken.verifyUserToken, wishListController.updateWishList)
	.get(verifyToken.verifyUserToken, wishListController.getUserWishList);

router.route('/wishlist/:productId')
	.delete(verifyToken.verifyUserToken, wishListController.deleteWishListItem);

/*-------------------RUTAS DE LOS PEDIDOS--------------- */
router.route('/pedido/user')
	.get(verifyToken.verifyUserToken, pedidoController.obtenerPedidosUsuario);

router.route('/pedido')
	.post(verifyToken.verifyUserToken, pedidoController.createPedido);

router.route('/pedido/:pedidoId')
	.delete(verifyToken.verifyUserToken, pedidoController.cancelPedido)
	.get(verifyToken.verifyUserToken, pedidoController.obtenerPedido);

module.exports = router;