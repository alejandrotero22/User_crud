const crudController = require('../controllers/crud-user');
const express = require('express');
const api = express.Router();

api.post('/create-user', crudController.createUser);
api.get('/get-user/:firstName', crudController.getUser);
api.put('/update-user', crudController.updateUser);
//Pasarle el parametro para que lo encuentre
api.delete('/delete-user/:email', crudController.deleteUser);

module.exports = api;