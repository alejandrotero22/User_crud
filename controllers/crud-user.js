const User = require('../models/user');

exports.createUser = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    try {
    const newUser = await new User({
        firstName, 
        lastName,
        email
    }).save();

    if(!newUser){
        const mensaje = 'Error en el sistema';
        console.log(mensaje);
        return res.status(500).json({
            ok: false,
            message: mensaje
        })
    }
    
    return res.status(200).json(newUser);
    } catch (exception) {
        //.stack sirve para saber exactamente cual es el problema
        console.log(exception.stack);
        return res.status(500).json({
            ok: false,
            message: `${exception}`
        })
    }
}

exports.getUser = async (req, res) => {
    const {firstName} = req.params;
    try {
        const user = await User.findOne({firstName}).exec();
        if(!user){
            console.log("User not found");
            return res.status(404).json({
                ok: false,
                statusCode: 404,
                message: 'User not found',
            });
        }
        return res.status(200).json(user);

    } catch (exception) {
        console.log(exception.stack);
        return res.status(500).json({
            ok: false,
            message: exception,
        });
    }
};

exports.updateUser = async(req, res) => {
    const {email, newName} = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            {email},
            {firstName: newName },
            {new: true},
        ).exec();
        if(!updatedUser){
            const message = 'Server error';
            return res.status(500).json({
                ok: false,
                statusCode: 500,
                message,
            });
        }

        return res.status(200).json(updatedUser);
    } catch (exception) {
        console.log(exception.stack);
        return res.status(500).json({
            ok: false,
            message: exception,
            statusCode: 500
        })
    }
}

exports.deleteUser = async(req, res) => {
    const {email} = req.params;

    try {
        await User.findOneAndDelete({email}).exec();
        
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