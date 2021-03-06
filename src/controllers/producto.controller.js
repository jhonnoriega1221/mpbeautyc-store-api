//Dependencias
const Producto = require('../models/Producto');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const fs = require('fs-extra');

//Funciones

//- Crear producto
async function createProducto(req, res){
    const { name,
            categoryIndex,
            categoryName,
            brandIndex,
            brandName,
            originalPrice,
            discount,
            stockSize,
            description
        } = req.body;

        const category={categoryIndex, categoryName};
        const brand={brandIndex, brandName};

    const newProducto = {
        name:name,
        unsubscribed:false,
        category:category,
        brand:brand,
        actualPrice:originalPrice-(originalPrice*(discount/100)),
        originalPrice:originalPrice,
        discount:discount,
        rating:0,
        opinionQuantity:0,
        stockSize:stockSize,
        description:description,
        soldTimes:0
        }

    const producto = new Producto(newProducto);
    if(req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        producto.setImgUrl( result.url );
    }
    await producto.save();
    await fs.unlink(req.file.path);

    return res.json({
        message: 'Producto almacenado',
        producto
    });
}

//- Leer productos
async function readProductos(req, res){
    const productos = await Producto.find().sort({"createdAt": -1});
    return res.json(productos);

}

//- Leer productos disponibles
async function readProductosDisponibles(req, res){
         const productos = await Producto.aggregate([
        { $match:{unsubscribed:false}},
        { $sort:{createdAt:-1}}
    ]);
    return res.json(productos);
}

//- Leer producto
async function readProducto(req, res){
	const {id} = req.params;
	const producto = await Producto.findById(id);
	return res.json(producto);
}

//- Buscar producto
async function buscarProducto(req, res){
    const{ query } = req.params;

    const producto = await Producto.find({$text: {$search: query}});
    return res.json(producto);
}

//- Modificar producto
async function updateProducto(req, res){
    const {id} = req.params;
    const{
        name,
        originalPrice,
        discount,
        stockSize,
        description,
        category = {
            categoryIndex,
            categoryName
        },
        brand={
            brandIndex,
            brandName
        }
    } = req.body


    const updatedProducto = await Producto.findByIdAndUpdate(id,{
        name,
        originalPrice,
        discount,
        stockSize,
        actualPrice:originalPrice-(originalPrice*(discount/100)),
        description,
        category,
        brand
        },{new:true});
        return res.json({
            message: 'Producto actualizado',
            updatedProducto
        });
}

//- Dar de baja a un producto
async function unsubscribeProducto(req,res){
    const {id} = req.params;
    const unsubscribedProducto = await Producto.findByIdAndUpdate(id,{
        unsubscribed:true
    });

    return res.json({
        message:'Producto dado de baja',
        unsubscribedProducto
    })
}

//- Poner a la venta un producto que estaba dado de baja
async function subscribeProducto(req,res){
    const {id} = req.params;
    const subscribedProducto = await Producto.findByIdAndUpdate(id,{
        unsubscribed:false
    });

    return res.json({
        message:'Producto puesto en venta',
        subscribedProducto
    })
}

module.exports = {
    createProducto,
    readProductos,
    readProducto,
    readProductosDisponibles,
    buscarProducto,
    updateProducto,
    unsubscribeProducto,
    subscribeProducto
}
