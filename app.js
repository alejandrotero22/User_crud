const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

//Routes
const crudUserRoutes = require('./routes/crud-user');
const crudListRoutes = require('./routes/crud-listaDeCompras');

//POST o PUT se recibe como req.body
//GET o DELETE se recibe como req.params
//app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(cors());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api', crudUserRoutes);
app.use('/api', crudListRoutes);

module.exports = app;