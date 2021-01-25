//Dependencias
const Producto = require('../models/Producto');
const Pedido = require('../models/Pedido');

//funciones

//Crear pedido
async function createPedido(req, res){

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

//Obtener los pedidos de un usuario
async function getPedidosUsuario(req, res){
    
    const pedidosUser = await Pedido.find({userId:req.userId})

    return res.json(pedidosUser);
}

//Obtener un pedido en especifico
async function getPedido(req, res){
    
    const id = req.params.pedidoId;

    const pedido = await Pedido.findById(id);

    return res.json(pedido);
}

//Cancelar pedido
async function cancelPedido(req, res){
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

module.exports = {
    createPedido,
    cancelPedido,
    getPedidosUsuario,
    getPedido
}