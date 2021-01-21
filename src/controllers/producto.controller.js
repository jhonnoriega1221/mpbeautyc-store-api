let Producto = require('../models/Producto')

//Crear producto
const createProducto = async function createProducto(req, res){
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

const buscarProducto = async function buscarProducto(req, res){
    const{ query } = req.params;

    const producto = await Producto.find({$text: {$search: query}});
    return res.json(producto);
}

const updateProducto = async function updateProducto(req, res){
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

const unsubscribeProducto = async function unsubscribeProducto(req,res){
    const {id} = req.params;
    const unsubscribedProducto = await Producto.findByIdAndUpdate(id,{
        unsubscribed:true
    });

    return res.json({
        message:'Producto dado de baja',
        unsubscribedProducto
    })
}

const subscribeProducto = async function subscribeProducto(req,res){
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
    createProducto:createProducto,
    readProductos:readProductos,
    readProducto:readProducto,
    buscarProducto:buscarProducto,
    updateProducto:updateProducto,
    unsubscribeProducto:unsubscribeProducto,
    subscribeProducto:subscribeProducto
}
