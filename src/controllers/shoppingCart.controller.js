//Dependencias
let ShoppingCart = require('../models/ShoppingCart');


//Funciones

//Leer carrito de compras
async function readShoppingCart(req, res){
    const shoppingCart = await ShoppingCart.find({"userId":req.userId});
    return res.json(shoppingCart);
}

//Agregar item al carrito de compras
async function addShoppingCartItem(req, res){
	const {
        productId,
        quantity
    
		} = req.body;

	const updatedShoppingCart = await ShoppingCart.findOneAndUpdate({userId:req.userId}, {
		$push:{products:{ productId, quantity}}
	}, {new: true});

	return res.json(updatedShoppingCart);
}

//Eliminar item del carrito de compras
async function deleteShoppingCartItem(req, res){
    const { productId } = req.params

    const deletedShopingCartItem = await ShoppingCart.findOneAndUpdate({userId:req.userId}, {
        $pull:{products:{ productId }}
    }, {new:true});

    return res.json(deletedShopingCartItem);
}

module.exports = {
    readShoppingCart,
    addShoppingCartItem,
    deleteShoppingCartItem
}