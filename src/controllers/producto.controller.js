let Producto = require('../models/Producto')

//Crear producto
const createProducto = async function createProducto(req, res){
    const { name,
            status,
            category,
            brand,
            actualPrice,
            originalPrice,
            discount,
            rating,
            opinionQuantity,
            stockSize,
            description,
            soldTimes,
            colors
        } = req.body;

        

    const newProducto = {
        name:name,
        status:status,
        category:category,
        brand:brand,
        actualPrice:actualPrice,
        originalPrice:originalPrice,
        discount:discount,
        rating:rating,
        opinionQuantity:opinionQuantity,
        stockSize:stockSize,
        description:description,
        soldTimes:soldTimes,
        colors:colors
        }



    const producto = new Producto(newProducto);
    if(req.file) {
        const { filename } = req.file;
        producto.setImgUrl( filename );
    }
    await producto.save();

    return res.json({
        message: 'Producto almacenado',
        producto
    });
}

//Leer productos
const readProductos = async function readProductos(req, res){
    const productos = await Producto.find().sort({"createdAt": -1});
    return res.json(productos);
}

//Consultar información de un producto especifico
const readProducto = async function readProducto(req, res){
	const {id} = req.params;
	const producto = await Producto.findById(id);
	return res.json(producto);
}

module.exports = {
    createProducto:createProducto,
    readProductos:readProductos,
    readProducto:readProducto
}
