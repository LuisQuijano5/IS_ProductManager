import express from 'express';
import colors from 'colors';
import router from './router';
import db from './config/db';

async function connectDB() {
    try{
        await db.authenticate();
        db.sync();
        console.log(colors.blue('Conexion exitosa a la db'));
    } catch (error) {
        console.log(error);
        console.log(colors.red.bold('Algo salio mal en la conexion a la db'));
    }
}

connectDB();

// Instancia de express
const server = express();

// Middleware
server.use(express.json());
server.use('/api/products', router);


export default server;