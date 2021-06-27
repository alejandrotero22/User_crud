const User = require('../models/user');
const listaDeCompras = require('../models/listaDeCompras')

exports.createList = async (req, res) => {
    const { id, listProducts } = req.body;
    try {

    const userOwner = await User.findById(id);

    const newList = await new listaDeCompras({
        userOwner,
        listProducts
    }).save();

    if(!newList){
        const mensaje = 'Error en el sistema';
        console.log(mensaje);
        return res.status(500).json({
            ok: false,
            message: mensaje
        })
    }
    
    return res.status(200).json(newList);
    } catch (exception) {
        //.stack sirve para saber exactamente cual es el problema
        console.log(exception.stack);
        return res.status(500).json({
            ok: false,
            message: `${exception}`
        })
    }
}

exports.getList = async (req, res) => {
    const {id} = req.params;
    try {

        const list = await listaDeCompras.findById(id).exec();

        if(!list){
            console.log("List not found");
            return res.status(404).json({
                ok: false,
                statusCode: 404,
                message: 'List not found',
            });
        }
        return res.status(200).json(list);

    } catch (exception) {
        console.log(exception.stack);
        return res.status(500).json({
            ok: false,
            message: exception,
        });
    }
};

exports.updateList = async(req, res) => {
    const {id, newProduct} = req.body;

    try {
        const userOwner = await User.findById(id);
        const updatedList = await listaDeCompras.findOneAndUpdate(
            {userOwner},
            {$push: {listProducts: newProduct}},
            {new: true},
        ).exec();

        if(!updatedList){
            const message = 'Server error';
            return res.status(500).json({
                ok: false,
                statusCode: 500,
                message,
            });
        }

        return res.status(200).json(updatedList);
    } catch (exception) {
        console.log(exception.stack);
        return res.status(500).json({
            ok: false,
            message: exception,
            statusCode: 500
        })
    }
}

exports.deleteList = async(req, res) => {
    const {id} = req.params;

    try {

        await listaDeCompras.findOneAndDelete(id).exec();
        
        return res.status(500).json({message: 'Success!'});
    } catch (exception) {
        console.log(exception.stack);
        return res.status(500).json({
            ok: false,
            message: exception,
            statusCode: 500
        })
    }
}
