const crudControllerList = require('../controllers/crud-listaDeCompras');
const express = require('express');
const api = express.Router();

//routes for list of products
api.post('/create-list', crudControllerList.createList);
api.get('/get-list/:id', crudControllerList.getList);
api.put('/update-list', crudControllerList.updateList);
api.delete('/delete-list/:id', crudControllerList.deleteList);

module.exports = api;