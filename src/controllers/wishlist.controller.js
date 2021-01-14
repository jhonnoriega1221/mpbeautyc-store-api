const User = require('../models/User');

//Agregar item a la lista de favoritos
const updateWishList = async function updateWishList(req, res){
	const {
        productId
		} = req.body;

	const updatedWishList = await User.findByIdAndUpdate(req.userId, {
		$push:{wishList:{ productId}}
	}, {new: true});

	return res.status(200).json(updatedWishList.wishList);
}

const deleteWishListItem = async function deleteWishListItem(req,res){
    const{
        productId
    } = req.params;

    const deletedWishListItem = await User.findByIdAndUpdate({_id:req.userId}, {
        $pull:{wishList:{productId}}
    }, {new: true});

    return res.status(200).json(deletedWishListItem.wishList);
}

const getUserWishList = async function getUserWishListItem(req, res){
    User.findById(req.userId, {email: 0, password: 0, name: 0, surname: 0, cc: 0, address: 0, addressComplement: 0, country:0, city:0, phoneNumber:0}, function(err, user){
        if(err) return res.status(500).send("Hubo un problema encontrando al usuario");
        if(!user) return res.status(404).send("No se encontró al usuario");

        res.status(200).json(user.wishList);
    })
}

module.exports ={
    updateWishList:updateWishList,
    deleteWishListItem:deleteWishListItem,
    getUserWishList:getUserWishList
}