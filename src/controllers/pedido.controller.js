const Producto = require('../models/Producto');
const Pedido = require('../models/Pedido');
const { findOneAndUpdate } = require('../models/Pedido');

//Crear pedido
const createPedido = async function createPedido(req, res){

    const userId = req.userId;
    const{
        status="Pendiente",
        shippingCost,
        productsTotal,
        netTotal,
        products=[{
            productId,
            productName,
            imgUrl,
            oldPrice,
            actualPrice,
            discount,
            quantity,
            color,
            totalProduct
        }]
    } = req.body;

    const newPedido ={
        userId,
        status,
        shippingCost,
        productsTotal,
        netTotal,
        products
    }

    const pedido = new Pedido(newPedido);
    for(let i=0;i<newPedido.products.length;i++){
        await Producto.findByIdAndUpdate(newPedido.products[i].productId,{
            $inc:{"stockSize":-newPedido.products[i].quantity}
        });
    }
    await pedido.save();




    return res.json({
        message: 'Pedido almacenado',
        pedido
    });
}

const obtenerPedidosUsuario = async function obtenerPedidosUsuario(req, res){
    
    const pedidosUser = await Pedido.find({userId:req.userId})

    return res.json(pedidosUser);
}

const obtenerPedido = async function obtenerPedido(req, res){
    
    const id = req.params.pedidoId;

    const pedido = await Pedido.findById(id);

    return res.json(pedido);
}

const cancelPedido = async function cancelPedido(req, res){
    const { id } = req.params

    await Pedido.findByIdAndUpdate({_id:req.params.pedidoId},{
        status:"Cancelado"
    }, async function(err,result){
        if(err){
            res.send(err)
        } else {
            for(let i=0;i<result.products.length;i++){
                await Producto.findByIdAndUpdate(result.products[i].productId,{
                    $inc:{"stockSize":result.products[i].quantity}
                });
            }
            res.send(result)
        }
    });
    

}

module.exports ={
    createPedido:createPedido,
    cancelPedido:cancelPedido,
    obtenerPedidosUsuario:obtenerPedidosUsuario,
    obtenerPedido:obtenerPedido
}