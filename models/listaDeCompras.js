const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comprasSchema = Schema({
    userOwner:{
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
    },
    listProducts: [String],
},{
    timestamps: true,
    collection: 'listaDeCompras',
});

module.exports = mongoose.model('listaDeCompras', comprasSchema);