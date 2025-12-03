import express from 'express';
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import productRouter from './routes/product.route';
import authRouter from './routes/auth.route';

import db from './config/db';

export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        //console.log(colors.blue('Conexion exitosa a la db'));
    } catch (error) {
        console.log(error);
        console.log(colors.red.bold('Algo salio mal en la conexion a la db'));
    }
}

connectDB();

// Instancia de express
const server = express();

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
server.use(cors());

// Middleware
server.use(express.json());
server.use('/api/products', productRouter);
server.use('/api/auth', authRouter);

//DOCS
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server;