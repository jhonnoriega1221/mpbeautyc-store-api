const Router = require('express');
const upload = require('../libs/multer')
const router = Router();


const productoController = require('../controllers/producto.controller');
const preguntaController = require('../controllers/pregunta.controller');
const opinionController = require ('../controllers/opinion.controller');
const adminController = require ('../controllers/admin.controller');
const shoppingCartController = require ('../controllers/shoppingCart.controller');
const wishListController = require ('../controllers/wishlist.controller');
const pedidoController = require ('../controllers/pedido.controller');
const verifyToken = require('../auth/verifyToken');
const userController = require('../controllers/user.controller');

/*--------------RUTAS ADMIN-------------------- */
router.route('/admin')
	.get(verifyToken.verifyAdminToken, adminController.getAdminLogued);

router.route('/admin/admin')
	.get(verifyToken.verifyAdminToken, adminController.getAdmins)
	.post(verifyToken.verifyAdminToken, adminController.registerAdmin);

router.route('/admin/admin/:id')
	.get(verifyToken.verifyAdminToken, adminController.getAdmin)
	.put(verifyToken.verifyAdminToken, adminController.updateAdmin)
	.delete(verifyToken.verifyAdminToken, adminController.deleteAdmin);

router.route('/admin/login')
	.post(adminController.loginAdmin);

/*--------------RUTAS USUARIO---------------- */

router.route('/user/:id')
	.get(verifyToken.verifyAdminToken, userController.getUsuario);

router.route('/user')
	.get(verifyToken.verifyUserToken, userController.getUsuarioLogued);

router.route('/user/login')
	.post(userController.loginUsuario);

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
	.get(verifyToken.verifyAdminToken, preguntaController.readPreguntas)

router.route('/pregunta/:id')	
	.get(verifyToken.verifyAdminToken, preguntaController.readPregunta)
	.put(verifyToken.verifyAdminToken, preguntaController.responderPregunta);

router.route('/producto/:productoId/pregunta') //Preguntas de un producto en especifico
	.get(preguntaController.readPreguntasProducto)
	.post(verifyToken.verifyUserToken, preguntaController.createPregunta);


	/*------------RUTAS OPINIONES-------------- */

router.route('/opinion')
	.get(opinionController.readOpiniones) //
	.post(verifyToken.verifyUserToken, opinionController.createOpinion);

router.route('/opinion/:id') //Opiniones de un producto en especifico
	.get(opinionController.readOpinionProducto);

	/*-------------RUTAS CARRITO DE COMPRAS------------------ */
router.route('/shoppingcart')
	.get(verifyToken.verifyUserToken, shoppingCartController.readShoppingCart)
	.put(verifyToken.verifyUserToken, shoppingCartController.addShoppingCartItem);

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
	.get(verifyToken.verifyUserToken, pedidoController.getPedidosUsuario);

router.route('/pedido')
	.post(verifyToken.verifyUserToken, pedidoController.createPedido)
	.get(verifyToken.verifyAdminToken, pedidoController.getPedidos);

router.route('/pedido/:pedidoId')
	.delete(verifyToken.verifyUserToken, pedidoController.cancelPedido)
	.get(verifyToken.verifyUserToken, pedidoController.getPedido)
	.put(verifyToken.verifyAdminToken, pedidoController.updatePedido);

/*------------RUTAS DE VENTAS*----------------*/
router.route('/venta')
	.get(verifyToken.verifyAdminToken, pedidoController.getPedidosEntregados);
module.exports = router;