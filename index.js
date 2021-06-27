const app = require('./app');
const mongoose = require('mongoose');

const port = 3003;
const mongooseUrl = 'mongodb://localhost:27017/devant';

//Para conectar a base de datos
mongoose.connect(
    mongooseUrl,{
        //Para evitar deprication warnings
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    }, error => {
        if(!error){
            console.log('Connected correctly to db.');
            app.listen(port, error =>{
                if(error){
                    console.log(error);
                }
                console.log(`Successfully connected to port ${port}`);
            })
        } else{
            console.log('Error stablishing connection with db.');
        }
    }
)
