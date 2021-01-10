const Router = require('express');
const upload = require('../libs/multer')
const router = Router();

const productoController = require('../controllers/producto.controller');

router.route('/producto')
	.get(productoController.readProductos)
	.post(upload.single('image'), productoController.createProducto);

module.exports = router;