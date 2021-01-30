//Dependencias
const Producto = require('../models/Producto');
const Pedido = require('../models/Pedido');
const User = require('../models/User');
const { Types } = require('mongoose');

//funciones

//Crear pedido
async function createPedido(req, res){

    const userId = Types.ObjectId(req.userId);
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

async function getPedidos(req, res){
    
    const pedidos = await Pedido.aggregate([
        {
            $lookup:
            {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userData'
            }
        }
    ]);

    return res.json(pedidos);
}

//Obtener los pedidos de un usuario
async function getPedidosUsuario(req, res){
    
    const pedidosUser = await Pedido.find({userId:req.userId})

    return res.json(pedidosUser);
}

//Obtener un pedido en especifico
async function getPedido(req, res){
    
    const id = req.params.pedidoId;

    const pedido = await Pedido.aggregate([
        { $match:{_id:Types.ObjectId(id)}},
        {
            $lookup:
            {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userData'
            }
        }
    ]);

    return res.json(pedido);
}

//Cancelar pedido
async function cancelPedido(req, res){

    const id = req.params.pedidoId;
    const status = await Pedido.findById(id);

    if(status.status == 'Entregado' || status.status == 'En camino')
        return res.status(400).send('No se puede cancelar el pedido');
    
    await Pedido.findByIdAndUpdate(id,{
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

async function updatePedido(req, res){
    const id = req.params.pedidoId;
    
    const status = await Pedido.findById(id);

    if(status.status == 'Entregado' || status.status == 'Cancelado')
        return res.status(400).send("No se pudo realizar la operación")

    let newStatus;

    if(status.status == 'Pendiente')
        newStatus = 'En preparación';
    else if(status.status == 'En preparación')
        newStatus = 'En camino';
    else if(status.status == 'En camino'){
        newStatus = 'Entregado';
    
        const pedido = await Pedido.findById(id);

        for(let i=0;i<pedido.products.length;i++){
            await Producto.findByIdAndUpdate(pedido.products[i].productId,{
                $inc:{"soldTimes":pedido.products[i].quantity}
            });
        }

    }

        const pedidoUpdated = await Pedido.findByIdAndUpdate(id,{
            status: newStatus
        });
        return res.status(200).send(pedidoUpdated);
}

module.exports = {
    createPedido,
    cancelPedido,
    getPedidosUsuario,
    getPedido,
    getPedidos,
    updatePedido
}