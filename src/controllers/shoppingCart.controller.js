let ShoppingCart = require('../models/ShoppingCart');


//Leer carrito de compras
const readShoppingCart = async function readShoppingCart(req, res){
    const shoppingCart = await ShoppingCart.find({"userId":req.userId});
    return res.json(shoppingCart);
}

//Agregar item al carrito de compras
const updateShoppingCart = async function updateShoppingCart(req, res){
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
const deleteShoppingCartItem = async function updateShoppingCart(req, res){
    const { productId } = req.params

    const deletedShopingCartItem = await ShoppingCart.findOneAndUpdate({userId:req.userId}, {
        $pull:{products:{ productId }}
    }, {new:true});

    return res.json(deletedShopingCartItem);
}

module.exports = {
    readShoppingCart:readShoppingCart,
    updateShoppingCart:updateShoppingCart,
    deleteShoppingCartItem:deleteShoppingCartItem
}
